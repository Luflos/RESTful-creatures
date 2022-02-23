// import packages
const { query } = require("express");
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const fs = require('fs')
const methodOverride = require ('method-override')

// create an instance of express
const app = express();

// middleware
// tell express to use ejs as the view engine
app.set("view engine", "ejs");
// tell express that we're using ejs layouts
app.use(ejsLayouts);
// method override configuration
app.use(methodOverride('_method'))
// body-parser 
// this allows us to access form data via req.body
app.use(express.urlencoded({extended: false}))


// Home
app.get('/', (req, res) => {
  res.send('Hello Dinos + Prehistoric Creatures')
})

// Controllers
app.use('/dinosaurs' , require ('./controllers/dinosaurController.js'))
app.use(require ('./controllers/prehistoric_creatureController.js'))


app.listen(8000, () => {
  console.log('Listening to the port')
})