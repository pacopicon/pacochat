const mongoose = require('mongoose');
const Room = mongoose.model('Room'); // we only need to reference this once b/c mongoose makes use of the singleton (in start.js) where the model is required only once

exports.createRoom = async (req, res) => {
  const room = await (new Room(req.body)).save();
  // res.redirect(`/room/${room.slug}`);
};

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json({ title: 'Rooms', rooms });
}

exports.editRoom = async (req, res) => {
  // 1. find the store given the ID
  const room = await Room.findOne({ _id: req.params.id });
  // note: findOne is a MongoDB function.
  // res.json(room);  use this to log the json right on the browser
  // 2. confirm they are the owner of the room
  // 3. render out the edit form so user can update room
  res.json({ title: `Edit ${room.body}`, room })
  // same as: res.render('editroom', { title: `Edit ${room.name}`, room: room })
}
// BTW, no harm if you tag a function as async if you're not really sure it needs it.

exports.updateRoom = async (req, res) => {
  // set the location data to be a point.
  // req.body.location.type = 'Point'
  // find and update the room
  const room = await Room.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new room instead of the old one
    runValidators: true // the validatorss are those options inside roomSchema in room.js, such as {trim: true} and {required: 'Please enter a room name!'}.  We still want these options active when editing the room, otherwise one could edit out the name of the room.
  }).exec(); // this runs the query
  res.redirect(`/rooms/${room._id}/edit`);
  // findOneAndUpdate() is a MongoDB function that allows us to query a piece of data from the DB and update it in one fell swoop.
  // redirect user to room and tell her it worked
}

// notes:
// req (request) = data that goes into something from us
// res (response) = data that comes out of something to us