
const apiKey = '';

$('#search_value').change(function(){
  
  const content= $('#search_value').val(); //get the query entered in the search bar
  console.log("Content: " + content); //testing purposes
  
  //document.getElementById("search_value").value= ""; //clear out the search bar

  window.location.href = `search.html?q=${encodeURIComponent(content)}`;
  /*
  var h4 = document.createElement('h4');
  h4.classList.add('mbr-section-subtitle', 'mbr-fonts-style', 'align-center', 'mb-0', 'mt-4', 'display-7');
  var strong = document.createElement('strong');
  strong.textContent = content;
  h4.appendChild = strong;
  document.getElementById('bookTitle').appendChild= h4;
  */
  $(document).ready(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const dynamicValueElement = document.getElementById('bookTitle');
    if (dynamicValueElement) {
      console.log("element found!")
        dynamicValueElement.textContent = content;
    }
  }),
  console.log("im through");
}),
  

  //call function "getBookInfo" to send query out to google books for available books
  getBookInfo(content)
  .then((books) => {
    console.log('Books:', books);
    // Process and display the book information here
    //printVolumeInfo(books);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
} )

function printVolumeInfo(allBooks){
    //clearBookDivs();

    //show results for the 1st six books, by default google books return 10
    for(let i=0; i<6; i++){

      // Create article element
      var article = document.createElement('article');
      article.classList.add('material-card');

      // Create h2 element
      var h2 = document.createElement('h2');

      // Create span element
      var span = document.createElement('span');
      span.textContent =  allBooks.items[i].volumeInfo.title;

      // Create strong element
      var strong = document.createElement('strong');
      strong.textContent = 'By: '+allBooks.items[i].volumeInfo.authors[0];

      // Append span and strong to h2
      h2.appendChild(span);
      h2.appendChild(strong);

      // Append h2 to article
      article.appendChild(h2);

      // Create div with class "mc-content"
      var mcContent = document.createElement('div');
      mcContent.classList.add('mc-content');

      // Create div with class "img-container"
      var imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      // Create img element
      var img = document.createElement('img');
      img.src = allBooks.items[i].volumeInfo.imageLinks.smallThumbnail;
      img.alt = 'Book Cover';
      img.classList.add('img-responsive');

      // Append img to imgContainer
      imgContainer.appendChild(img);

      // Create div with class "mc-description"
      var mcDescription = document.createElement('div');
      mcDescription.classList.add('mc-description');
      mcDescription.textContent = allBooks.items[i].volumeInfo.description;

      // Append imgContainer and mcDescription to mcContent
      mcContent.appendChild(imgContainer);
      mcContent.appendChild(mcDescription);

      // Append mcContent to article
      article.appendChild(mcContent);

      // Create a element with class "mc-btn-action"
      var mcBtnAction = document.createElement('a');
      mcBtnAction.classList.add('mc-btn-action');

      // Create i element with class "fa fa-bars"
      var iElement = document.createElement('i');
      iElement.classList.add('fa', 'fa-bars');

      // Append iElement to mcBtnAction
      mcBtnAction.appendChild(iElement);

      // Append mcBtnAction to article
      article.appendChild(mcBtnAction);

      // Create div with class "mc-footer"
      var mcFooter = document.createElement('div');
      mcFooter.classList.add('mc-footer');

      // Append mcFooter to article
      article.appendChild(mcFooter);

      //creaste div with class that holds the article
      var colmd = document.createElement('div');
      colmd.classList.add('col-md-4', 'col-sm-6', 'col-xs-12')
      colmd.appendChild(article)

      //append colmd into div that holds all articles
      document.getElementsByClassName('row active-with-click')[0].appendChild(colmd)
    }
}

// Function to fetch book information from the Google Books API
const getBookInfo = async (query) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // This returns an array of books that match the query
  } catch (error) {
    console.error('Error fetching book information:', error);
    return [];
  }
}
// Function to clear the content of book divs
function clearBookDivs() {
  // Loop through each book div and clear its content
  for (let i = 1; i <= 5; i++) {
    const bookDiv = document.getElementById('book' + i);
    if (bookDiv) {
      bookDiv.innerHTML = '';
    }
  }
}
$(function() {
  $('body').on('click', '.material-card > .mc-btn-action', function () {
      var card = $(this).parent('.material-card');
      var icon = $(this).children('i');
    

      if (card.hasClass('mc-active')) {
          card.removeClass('mc-active');

          window.setTimeout(function() {
              icon
                  .removeClass('fa-arrow-left')
                  .addClass('fa-bars');

          }, 800);
      } else {
          card.addClass('mc-active');

          window.setTimeout(function() {
              icon
                  .removeClass('fa-bars')
                  .addClass('fa-arrow-left');

          }, 800);
      }
  });
});

