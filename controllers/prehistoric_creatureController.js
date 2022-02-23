const express = require ('express')
const router = express.Router()
const fs = require('fs')

// PREHISTORIC CREATURES

// INDEX
router.get('/prehistoric_creatures', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  res.render('prehistoric_creatures/prehistoricCreatures.ejs', {creatures: creatureData})
})

// NEW Renders new creature
router.get('/prehistoric_creatures/new', (req, res) => {
  res.render('prehistoric_creatures/newCreature.ejs')
})

// EDIT 
router.get('/prehistoric_creatures/edit/:idx', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  let targetCreature = creatureData[creatureIndex]
  res.render('prehistoric_creatures/edit.ejs', {creature: targetCreature, creatureId: creatureIndex})
})

// PUT Route


// SHOW single creature
router.get('/prehistoric_creatures/:idx' , (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  let creatureIndex = req.params.idx
  let targetCreature = creatureData[creatureIndex]
  res.render('prehistoric_creatures/showCreature.ejs', {creature: targetCreature})
})

// POST a creature and redirect
router.post('/prehistoric_creatures', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  creatureData.push(req.body)
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
  res.redirect('/prehistoric_creatures')
})

module.exports = router