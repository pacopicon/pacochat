const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')
const roomController = require('../controllers/roomController')
const userController = require('../controllers/userController')

// const { catchErrors } = require('../handlers/errorHandlers')

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get('/', (req, res) => {
	res.json({message: "Hi Paco, the api is running"})
});

router.get('/messages', catchErrors(messageController.getMessages));
router.post('/addMessage', catchErrors(messageController.createMessage));

router.post('/addMessage/:id', catchErrors(messageController.updateMessage));
router.get('/messages/:id/edit', catchErrors(messageController.editMessage));

router.get('/rooms', catchErrors(roomController.getRooms));
router.post('/addRoom', catchErrors(roomController.createRoom));

router.post('/addRoom/:id', catchErrors(roomController.updateRoom));
router.get('/rooms/:id/edit', catchErrors(roomController.editRoom));

router.get('/users', catchErrors(userController.getUsers));
router.post('/addUser', catchErrors(userController.createUser));

router.post('/addUser/:id', catchErrors(userController.updateUser));
router.get('/users/:id/edit', catchErrors(userController.editUser));


module.exports = router;