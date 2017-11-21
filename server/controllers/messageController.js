const mongoose = require('mongoose');
const Message = mongoose.model('Message'); // we only need to reference this once b/c mongoose makes use of the singleton (in start.js) where the model is required only once

exports.createMessage = async (req, res) => {
  const message = await (new Message(req.body)).save();
  console.log('Save has been promised')
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find();
  res.json({ title: 'Messages', messages });
}

exports.editMessage = async (req, res) => {
  // 1. find the store given the ID
  const message = await Message.findOne({ _id: req.params.id });
  // note: findOne is a MongoDB function.
  // res.json(message);  use this to log the json right on the browser
  // 2. confirm they are the owner of the message
  // 3. render out the edit form so user can update message
  res.json({ title: `Edit ${message.body}`, message })
  // same as: res.render('editmessage', { title: `Edit ${message.name}`, message: message })
}
// BTW, no harm if you tag a function as async if you're not really sure it needs it.

// exports.updateMessage = async (req, res) => {
//   // set the location data to be a point.
//   // req.body.location.type = 'Point'
//   // find and update the message
//   const message = await Message.findOneAndUpdate({ _id: req.params.id }, req.body, {
//     new: true, // return the new message instead of the old one
//     // runValidators: true // the validatorss are those options inside messageSchema in message.js, such as {trim: true} and {required: 'Please enter a message name!'}.  We still want these options active when editing the message, otherwise one could edit out the name of the message.
//   }).exec(); // this runs the query
//   // res.redirect(`/messages/${message._id}/edit`);
//   // findOneAndUpdate() is a MongoDB function that allows us to query a piece of data from the DB and update it in one fell swoop.
//   // redirect user to message and tell her it worked
// }


exports.updateMessage = async (req, res) => {
  // set the location data to be a point.
  // req.body.location.type = 'Point'
  // find and update the message
  await Message.findById(req.params.message_id, (err, message) => {
    if (err) {
      res.send(err)
    } else {
      (req.body.body) ? message.body = req.body.body : null;
      (req.body.room) ? message.room = req.body.room : null;
    }

    message.save(err => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: "Message has been updated" })
      }
    })
  })
}

// exports.deleteMessage = async (req, res) => {
//   Message.remove({ _id: req.params.message_id }, (err, message) => {
//     if (err) {
//       res.send(err)
//     } else {
//       res.json({ message: "Message has been deleted" })
//     }
//   })
// }

// alternate way of writing:
exports.deleteMessage = async (req, res) => {
  Message.remove({ _id: req.params.message_id }, (err, message) => {
    if (err) 
      res.send(err);
    res.json({ message: "Message has been deleted" })
  })
}


// notes:
// req (request) = data that goes into something from us
// res (response) = data that comes out of something to us