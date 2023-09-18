
const apiKey = '';

$('#search_value').change(function(){
  
  const content= $('#search_value').val(); //get the query entered in the search bar
  console.log("Content: " + content); //testing purposes
  document.getElementById("title_div").innerHTML = "Results for '" + content +"'";
  document.getElementById("search_value").value= ""; //clear out the search bar

  //call function "getBookInfo" to send query out to google books for available books
  getBookInfo(content)
  .then((books) => {
    console.log('Books:', books);
    // Process and display the book information here
    printVolumeInfo(books);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
} )
function printVolumeInfo(allBooks ){
  //show results for the 1st five books, by default google books return 10
  for(i=0; i<5; i++){
    var booki= 'book'+(i+1)

    //create HTML elements for the book display

    //element for the thumbnail of the book
    var thumbnail= document.createElement('div')
    thumbnail.className= "book thumbnail"
    document.getElementById(booki).appendChild(thumbnail)
    //element for the Title of the book
    var title= document.createElement('div')
    title.className= "book title"
    document.getElementById(booki).appendChild(title)
    //element for the author of the book
    var author= document.createElement('div')
    author.className="book author"
    document.getElementById(booki).appendChild(author)
    //element for the number of pages in the book
    var pages= document.createElement('div')
    pages.className="book pages"
    document.getElementById(booki).appendChild(pages)
    //element for the description of the book
    var description= document.createElement('div')
    description.className="book description"
    document.getElementById(booki).appendChild(description)

    //populate the book elements
    var img= document.createElement('img')
    img.src=allBooks.items[i].volumeInfo.imageLinks.smallThumbnail
    document.getElementsByClassName('book thumbnail')[i].appendChild(img)


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
    return data.items; // This returns an array of books that match the query
  } catch (error) {
    console.error('Error fetching book information:', error);
    return [];
  }
};

