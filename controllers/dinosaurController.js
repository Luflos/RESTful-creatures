const express = require ('express')
const router = express.Router()
const fs = require('fs')

// INDEX ie list all the dinos!
router.get('/', (req, res) => {
  // read in the array from dinosaurs.json
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // console.log(dinoData)

  // grabbing the queried name from the url
  let nameFilter = req.query.nameFilter
  // if there is a query,
  if(nameFilter) {
  // filter out all dinos who don't have the queried name
  dinoData = dinoData.filter(dino => {
    return dino.name.toLowerCase() === nameFilter.toLowerCase()
  })
}
  res.render('dinosaur/index.ejs', {myDinos: dinoData})
})

// NEW (renders the form)  Has to be above the SHOW route
router.get('/new', (req, res) => {
  res.render('dinosaur/new.ejs')
})

// EDIT form route (renders edit form)
router.get('/edit/:idx', (req, res) => {
  // read in the dinos from the database
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // extract the dino corresponing to idx param
  let dinoIndex = req.params.idx
  let targetDino = dinoData[dinoIndex]
 // snatch the dino to be updated
 res.render('dinosaur/edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})

// PUT Route
router.put('/:idx', (req, res) => {
  // console.log(`You hit the put route for editing dino with id of ${req.params.idx}`)
  // read in out existing dino data
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // replace dino fields with field from form
  dinoData[req.params.idx].name = req.body.name
  dinoData[req.params.idx].type = req.body.type
  // write the updated array back to the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // once the dinosaur has been editted, do a get request to the index route
  res.redirect('/dinosaurs')
})

// SHOW ie shows all info about a single dino
// :  indicates that the following is a url parameter
router.get('/:idx', (req, res) => {
  // read in the dinos from the database
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // extract the dino corresponing to idx param
  let dinoIndex = req.params.idx
  let targetDino = dinoData[dinoIndex]
  res.render('dinosaur/show.ejs', {dino: targetDino})
  // console.log('idx:' + req.params.idx)
})

// Post a new dino
router.post('/', (req, res) => {
  // read in our dino data from the json file
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // add the new dino to the dinoData array
  dinoData.push(req.body)
  // save the dinosaurs to the json file
  //  JSON.stringify turns dinoData into a JSON file then puts it into dinosaurs.json
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // redirect back to the index route
  // res.redirect takes the url pattern for the get route that you want to run next
  res.redirect('/dinosaurs')
  // console.log(req.body)
})

// DELETE
router.delete('/:idx', (req, res) => {
  // console.log(`You're trying to delete dino #${req.params.idx}`)
  // read in our dinos from our json file
  let dinosaurs = fs.readFileSync('./dinosaurs.json')
  let dinoData = JSON.parse(dinosaurs)
  // remove the delete dino from dinoData
  dinoData.splice(req.params.idx, 1)
  // write the updated array back to the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // once the dinosaur has been deleted, do a get request to the index route
  res.redirect('/dinosaurs')
})

module.exports = router