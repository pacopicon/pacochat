const mongoose = require('mongoose');
const Message = mongoose.model('Message'); // we only need to reference this once b/c mongoose makes use of the singleton (in start.js) where the model is required only once

exports.homePage = (req, res) => {
  console.log(req.name); // req.name is still 'Paco'
  res.render('index');
}

exports.addMessage = (req, res) => {
  res.render('editMessage', { title: 'Add Message' });
}

exports.createMessage = async (req, res) => {
  // const store = new Store(req.body);
  // await store.save(); // since we need the slug from the store (store.slug) that is auto-generated only after it saves (b/c we want to redirect user to that specific store), we need a variable that stands in for the already-saved store.  See below:
  const message = await (new Message(req.body)).save();
  // console.log('Save has been promised')
  res.redirect(`/message/${message.slug}`);
};

exports.getMessages = async (req, res) => {
  // Query the db for a list of all stores
  const messages = await Message.find();
  res.render('messages', { title: 'Messages', messages });
  // same as: res.render('stores', { title: 'Stores', stores: stores });
}

exports.editMessage = async (req, res) => {
  // 1. find the store given the ID
  const message = await Message.findOne({ _id: req.params.id });
  // note: findOne is a MongoDB function.
  // res.json(store);  use this to log the json right on the browser
  // 2. confirm they are the owner of the store
  // 3. render out the edit form so user can update store
  res.render('editMessage', { title: `Edit ${message.body}`, message })
  // same as: res.render('editStore', { title: `Edit ${store.name}`, store: store })
}
// BTW, no harm if you tag a function as async if you're not really sure it needs it.

exports.updateMessage = async (req, res) => {
  // set the location data to be a point.
  req.body.location.type = 'Point'
  // find and update the store
  const message = await Message.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true // the validatorss are those options inside storeSchema in Store.js, such as {trim: true} and {required: 'Please enter a store name!'}.  We still want these options active when editing the store, otherwise one could edit out the name of the store.
  }).exec(); // this runs the query
  res.redirect(`/messages/${message._id}/edit`);
  // findOneAndUpdate() is a MongoDB function that allows us to query a piece of data from the DB and update it in one fell swoop.
  // redirect user to store and tell her it worked
}

// notes:
// req (request) = data that goes into something from us
// res (response) = data that comes out of something to us