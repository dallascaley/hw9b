// Load the Express package as a module
const express = require("express");

// Access the exported service
const app = express();
const multer = require("multer");
const upload = multer();

// Body parser
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Note: there's a better way to do all of this stuff, but i'm trying to limit
// myself to the stuff actually taught in this class

// Return css page
app.get("/css/styles.css", (request, response) => {
  response.sendFile(`${__dirname}/css/styles.css`);
});

// This is for all the js pages
app.get("/public/ex1.js", (request, response) => {
  response.sendFile(`${__dirname}/public/ex1.js`);
});
app.get("/public/ex2.js", (request, response) => {
  response.sendFile(`${__dirname}/public/ex2.js`);
});
app.get("/public/ex3.js", (request, response) => {
  response.sendFile(`${__dirname}/public/ex3.js`);
});

// Return a string for requests to the root URL ("/")
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/ex1.html", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});

app.post("/ex1.html", upload.array(), (request, response) => {
  let email = request.body.email;
  let name = request.body.name;
  response.send(`${name}, Thank you for your order. We will keep you posted on delivery status at ${email}`);
});

app.get("/ex2.html", (request, response) => {
  response.sendFile(`${__dirname}/views/ex2.html`);
});

app.post("/api/countries", jsonParser, (request, response) => {
  let name = request.body.name;
  let countryCount = request.body.countries.length;
  response.send(`Your name is ${name} and you visited ${countryCount} countries. Keep traveling!`);
});

app.get("/ex3.html", (request, response) => {
  response.sendFile(`${__dirname}/views/ex3.html`);
});

let articles = []
app.post("/articles", upload.array(), (request, response) => {
  articles.push(request.body.title);
  response.send(`New article added successfully with title "${request.body.title}" and ID ${articles.length}`);
});

// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});