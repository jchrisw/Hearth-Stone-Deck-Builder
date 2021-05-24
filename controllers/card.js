const express = require('express');
const router = express.Router();
const db = require('../models');



router.get('/', function(req, res){
  console.log("-----I'M IN THIS ROUTE FINALLY-----")
  db.card.findAll()
  .then(foundCards => {
    console.log("-----HERE IS FOUNDCARDS-----")
    console.log(foundCards)
    res.render('deck', { allCards: foundCards })
  })
})

router.post('/deck', function(req, res){
  const {img, name, text, type, playerClass} = req.body 
  const {id} = req.user
  //create card add user to card
  db.card.create({
    img, name, text, type, playerClass, userId:id
  })
  .then(newCard => {
    console.log("-----HERE IS THE FAVORITED CARD-----")
    console.log(newCard)
    res.redirect('/cards');
  })
})


router.post('/deck', function(req, res) {
  //create card add user to card
  db.comment.create(
    {description:req.body.description},
    {where:{cardModelId:req.body.card.id}}
  )
  .then(createdComment => {
    console.log(createdComment)
    res.render(createdComment)
  })
})


// router.get('/deck', function(req, res) {
//   res.render('deck')
// })

router.delete('/deck', function(req, res) {
  db.card.destroy(
    {where:{cardId:req.body.cardId}}
  )
  .then(deletedCard => {
    cardId.pop()
    console.log(deletedCard)
    res.redirect('deck')
  })
})


/* for (let i = 0; i < data.length; i++) {
        let card = data[i];
        console.log(card.img);
        if (card.img) {
          allCards.push(card);
        }
      }*/
module.exports = router;
