const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')

// const { catchErrors } = require('../handlers/errorHandlers')

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get('/', (req, res) => {
	res.json({message: "Hi Paco, the api is running"})
});

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema

// var TestSchema = new Schema({
//   author: String,
//   text: String
// })

// var Test = mongoose.model('Test', TestSchema);

//   //retrieve all tests from the database
//  router.get('/tests', (req, res) => {
//     //looks at our Test Schema
//     Test.find((req, res) => {
//       if (err)
//         res.send(err);
//       //responds with a json object of our database tests.
//       res.json(tests)
//     });
//   })
//   //post new test to the database
//  router.post('/tests', (req, res) => {
//     var Test = new Test();
//     //body parser lets us use the req.body
//     test.author = req.body.author;
//     test.text = req.body.text;

//     test.save(function(err) {
//       if (err)
//         res.send(err);
//       res.json({ message: 'Test-message successfully added!' });
//     });
//   });





// router.get('/', catchErrors(messageController.getMessages));
router.get('/messages', catchErrors(messageController.getMessages));
router.get('/add', messageController.addMessage); // this usually renders a Templating engine view (The "add message" form page)

router.post('/addMessage', catchErrors(messageController.createMessage));

router.post('/addMessage/:id', catchErrors(messageController.updateMessage));
router.get('/messages/:id/edit', catchErrors(messageController.editMessage));

// even before we get to the routes, App.js 'uses' a whole bunch of middleware functionality

module.exports = router;