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
	res.json({message: "Hi Paco, the server is running"})
});
// router.get('/', catchErrors(messageController.getMessages));
router.get('/messages', catchErrors(messageController.getMessages));
router.get('/add', messageController.addMessage);

router.post('/addMessage', catchErrors(messageController.createMessage));

router.post('/addMessage/:id', catchErrors(messageController.updateMessage));
router.get('/messages/:id/edit', catchErrors(messageController.editMessage));

// even before we get to the routes, App.js 'uses' a whole bunch of middleware functionality

module.exports = router;