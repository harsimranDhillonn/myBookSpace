# My Library

Using 'Google Books API' to search up available book's information.
"Diary-like website" to leave thoughts on read books. 

Complete:
- Search functionality
- Retrieving books from Google Books API
- Notes page, local storage is used to save and retrieve user notes

## How to run: 
### Prerequisites
- Node.js: Make sure Node.js is installed on your machine. You can download it from Node.js official website.
- API Key: This project requires an API key to function correctly. Users need to generate their own API key, please see following instructions on how to obtain one.
- Web Browser: Make sure you have a modern web browser installed (e.g., Chrome, Firefox).
- Text Editor: A text editor (e.g., VS Code, Eclipse) to edit configuration files.

### Installation
1. Clone the Repository:
- From your Text Editor, clone the repository by running the following command: 
  ```
  git clone https://github.com/harsimranDhillonn/myBookSpace.git
  ```
2. Open the terminal in the text editor to run the following commands:
  ```
  cd your-repository
  ```
3. Install Dependencies:
  ```
  npm install
  ```
4. Setup
  - Generate your Google Books API key from the following: https://console.cloud.google.com/projectselector2/apis/credentials?pli=1&supportedpurview=project&authuser=0
    - Create a project under Google Books API and select "Create Credentials" to generate your API key.
    - enter the API key in main.js' line 1:
     ```
     const apiKey="your_api_key_here"
     ```
5. Running the Application
- Start the Server:
  ```
  node server.js
  ```
6. Access the Application:
  - Open your web browser and navigate to http://localhost:3000.

Local Storage:

Your notes and other data will be stored locally in your browser's local storage, ensuring your data is preserved across sessions.

Troubleshooting
  Common Issues:
  
  Ensure Node.js is installed correctly.
  Check that the API key is correctly set up in main.js.
  Verify that all dependencies are installed using npm install.
  
Getting Help:
If you encounter issues, you can open an issue on the project's GitHub repository, also feel free to contact me on linkedIn.

------------------------------------------------------------------------------------------------------------

Credit
- mobirise: Home page template
- notes: https://www.youtube.com/watch?v=01YKQmia2Jw

Author: Harsimran Dhillon
