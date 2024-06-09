//NotesApi responsible for interacting with the local storage to store/delete notes

export default class NotesAPI{
    static getAllNotes(){
        const notes= JSON.parse(localStorage.getItem("notesapp-notes") || '[]'); 

        //sort notes by the most recently updated note
        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }
    
    //updates and adds a new note
    static saveNote(noteToSave){
        const notes = NotesAPI.getAllNotes();
        const existing= notes.find(note => note.id == noteToSave.id); //find the existing id to update
        if(existing){ //edit if existing id
            existing.title= noteToSave.title;
            existing.body= noteToSave.body;
            existing.update= new Date().toISOString();

        }else { //insert new note
            noteToSave.id= Math.floor(Math.random() * 1000000);
            noteToSave.updated= new Date().toISOString(); //for the ISO time stamp
            notes.push(noteToSave);
        }
        
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));

    }
    static deleteNote(id){
        const notes= NotesAPI.getAllNotes();
        const newNotes= notes.filter(note => note.id != id); //find notes not to delete
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));


    }
}