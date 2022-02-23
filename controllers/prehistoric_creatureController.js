const express = require ('express')
const router = express.Router()
const fs = require('fs')

// PREHISTORIC CREATURES

// INDEX
router.get('/prehistoric_creatures', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  let nameFilter = req.query.nameFilter
  if(nameFilter) {
    creatureData = creatureData.filter(creature => {
      return creature.type.toLowerCase() === nameFilter.toLowerCase()
    })
  }
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
  let creatureIndex = req.params.idx
  let targetCreature = creatureData[creatureIndex]
  res.render('prehistoric_creatures/edit.ejs', {creature: targetCreature, creatureId: creatureIndex})
})

// PUT Route
router.put('/prehistoric_creatures/:idx', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  creatureData[req.params.idx].type =req.body.type
  creatureData[req.params.idx].img_url =req.body.img_url
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
  res.redirect('/prehistoric_creatures')
})

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

// DELETE

router.delete('/prehistoric_creatures/:idx', (req, res) => {
  let creatures = fs.readFileSync('./prehistoric_creatures.json')
  let creatureData = JSON.parse(creatures)
  creatureData.splice(req.params.idx, 1)
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
  res.redirect('/prehistoric_creatures')
})

module.exports = router