const mongoose = require('mongoose');
const User = mongoose.model('User'); // we only need to reference this once b/c mongoose makes use of the singleton (in start.js) where the model is required only once

exports.homePage = (req, res) => {
  console.log(req.name); // req.name is still 'Paco'
  res.render('index');
}

exports.addUser = (req, res) => {
  res.render('editUser', { title: 'Add User' });
}

exports.createUser = async (req, res) => {
  // const store = new Store(req.body);
  // await store.save(); // since we need the slug from the store (store.slug) that is auto-generated only after it saves (b/c we want to redirect user to that specific store), we need a variable that stands in for the already-saved store.  See below:
  const user = await (new User(req.body)).save();
  // console.log('Save has been promised')
  // res.redirect(`/user/${user.slug}`);
};

exports.getUsers = async (req, res) => {
  // Query the db for a list of all stores
  const users = await User.find();
  res.render('users', { title: 'Users', users });
  // same as: res.render('stores', { title: 'Stores', stores: stores });
}

exports.editUser = async (req, res) => {
  // 1. find the store given the ID
  const user = await User.findOne({ _id: req.params.id });
  // note: findOne is a MongoDB function.
  // res.json(user);  use this to log the json right on the browser
  // 2. confirm they are the owner of the user
  // 3. render out the edit form so user can update user
  res.render('editUser', { title: `Edit ${user.body}`, user })
  // same as: res.render('edituser', { title: `Edit ${user.name}`, user: user })
}
// BTW, no harm if you tag a function as async if you're not really sure it needs it.

exports.updateUser = async (req, res) => {
  // // set the location data to be a point.
  // req.body.location.type = 'Point'
  // find and update the user
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new user instead of the old one
    runValidators: true // the validatorss are those options inside userSchema in user.js, such as {trim: true} and {required: 'Please enter a user name!'}.  We still want these options active when editing the user, otherwise one could edit out the name of the user.
  }).exec(); // this runs the query
  // res.redirect(`/users/${user._id}/edit`);
  // findOneAndUpdate() is a MongoDB function that allows us to query a piece of data from the DB and update it in one fell swoop.
  // redirect user to user and tell her it worked
}

// notes:
// req (request) = data that goes into something from us
// res (response) = data that comes out of something to us