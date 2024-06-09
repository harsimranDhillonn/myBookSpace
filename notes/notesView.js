
export default class notesView {
    constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete }= {}) {
        this.root= root;
        this.onNoteAdd= onNoteAdd;
        this.onNoteDelete= onNoteDelete;
        this.onNoteEdit= onNoteEdit;
        this.onNoteSelect= onNoteSelect;
        this.root.innerHTML=`
        <div class="notes__sidebar">
            <button class="notes__add" type="button">Add Note</button>
            <div class="notes__list"></div>
        </div>
        <div class="notes__preview">
            <input class="notes__title" type="text" placeholder="New Note...">
            <textarea class="notes__body" placeholder="Take Note..."></textarea>
        </div>
        `;
      this.btnAddNote = this.root.querySelector('.notes__add');
      this.inpTitle = this.root.querySelector('.notes__title');
      this.inpBody = this.root.querySelector('.notes__body');

      console.log('btnAddNote:', this.btnAddNote);
    console.log('inpTitle:', this.inpTitle);
    console.log('inpBody:', this.inpBody);

      if (!this.btnAddNote) {
          console.error("btnAddnote haven't been found");
          return;
      }else if(!this.inpTitle ){
        console.error("inpTitle haven't been found");
          return;
      }
      if (!this.inpBody){
        console.error("inpBody haven't been found");
          return;
      }

    

      this.btnAddNote.addEventListener("click", () => {
          this.onNoteAdd();
      });

      [this.inpTitle, this.inpBody].forEach(inputField => {
          inputField.addEventListener("blur", () => {
              const updatedTitle = this.inpTitle.value.trim();
              const updatedBody = this.inpBody.value.trim();

              this.onNoteEdit(updatedTitle, updatedBody);
          });
      });

      this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
      const MAX_BODY_LENGTH = 60;

      return `
          <div class="notes__list-item" data-note-id="${id}">
              <div class="notes__small-title">${title}</div>
              <div class="notes__small-body">
                  ${body.substring(0, MAX_BODY_LENGTH)}
                  ${body.length > MAX_BODY_LENGTH ? "..." : ""}
              </div>
              <div class="notes__small-updated">
                  ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
              </div>
          </div>
      `;
  }

  updateNoteList(notes) {
      const notesListContainer = this.root.querySelector(".notes__list");

      // Empty list
      notesListContainer.innerHTML = "";

      for (const note of notes) {
          const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
          notesListContainer.insertAdjacentHTML("beforeend", html);
      }

      // Add select/delete events for each list item
      notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
          noteListItem.addEventListener("click", () => {
              this.onNoteSelect(noteListItem.dataset.noteId);
          });

          noteListItem.addEventListener("dblclick", () => {
              const doDelete = confirm("Are you sure you want to delete this note?");

              if (doDelete) {
                  this.onNoteDelete(noteListItem.dataset.noteId);
              }
          });
      });
  }

  updateActiveNote(note) {
      const inpTitle = this.root.querySelector(".notes__title");
      const inpBody = this.root.querySelector(".notes__body");

      if (!inpTitle || !inpBody) {
          console.error("Could not find title or body input elements");
          return;
      }

      inpTitle.value = note.title;
      inpBody.value = note.body;

      this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
          noteListItem.classList.remove("notes__list-item--selected");
      });

      this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
      this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
  }
}