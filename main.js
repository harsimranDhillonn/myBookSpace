const apiKey="";

$(document).ready(function() {
  $('#search_value').change(function() {
    const content = $('#search_value').val(); // Get the query entered in the search bar
    console.log("Content: " + content); // Testing purposes

    // Redirect to the search.hutml page with the query parameter
    window.location.href = `search.html?q=${encodeURIComponent(content)}`;
  });

  // Check if there is a query parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('q'); 

  if (queryParam) {
    // Update the content on the search.html page based on the query parameter i.e the Book title
    const dynamicValueElement = document.getElementById('bookTitle');
    if (dynamicValueElement) {
      const strong = document.createElement('strong');
      strong.textContent ="  "+ queryParam;
      dynamicValueElement.appendChild(strong);
    }

    //call function "getBookInfo" to send query out to google books for available books
    getBookInfo(queryParam)
    .then((books) => {
      console.log('Books:', books); //test book content 
      //Process and display the book information
      printVolumeInfo(books);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
});

function printVolumeInfo(allBooks){
    //clearBookDivs();

    //show results for the 1st six books, by default google books return 10
    for(let i=0; i<6; i++){
      const slides = document.getElementsByClassName('embla__slide');
      var bookNum= i+1;

      const bookTitle = slides[i].querySelector('.book-title');
      bookTitle.textContent =  allBooks.items[i].volumeInfo.title;
    
      const authorName = slides[i].querySelector('.book-author');
      authorName.textContent = 'By: '+allBooks.items[i].volumeInfo.authors[0];

      const img = slides[i].querySelector('.book-img');;
      img.src = allBooks.items[i].volumeInfo.imageLinks.thumbnail;

      const pageNum= slides[i].querySelector('.book-pageNum');
      pageNum.textContent= 'Pages: ';
      if(allBooks.items[i].volumeInfo.pageCount != undefined && allBooks.items[i].volumeInfo.pageCount != '0'){ 
        pageNum.textContent+=allBooks.items[i].volumeInfo.pageCount;
      }else{
        pageNum.textContent+='unavailable';

      }


     /*
      const bookDescription = document.getElementById('Book'+i+'-description');
      bookDescription.textContent = allBooks.items[i].volumeInfo.description;
      */
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


function sendBookInfo(event, element) {
  event.preventDefault();

  const bookElement = element.closest('.slide-content');

  const title = bookElement.querySelector('.book-title').textContent.trim();
  const author = bookElement.querySelector('.book-author').textContent.trim();
  const pageNum = bookElement.querySelector('.book-pageNum').textContent.trim();
  const imgSrc = bookElement.querySelector('.book-img').src;

  localStorage.setItem('bookTitle', title);
  localStorage.setItem('bookAuthor', author);
  localStorage.setItem('bookPageNum', pageNum);
  localStorage.setItem('bookImgSrc', imgSrc);

  window.location.href = 'notes.html';
}