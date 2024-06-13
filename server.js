const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define a route to handle requests to main.js
app.get('/main.js', (req, res) => {
  res.sendFile(__dirname + '/main.js');
});
// Define other routes or middleware here

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
