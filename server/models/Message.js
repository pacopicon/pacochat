const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // 'global' in the back end is analogous to 'window' in the front end
const slug = require('slugs'); // helps make URL-friendly for our slugs

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: 'Enter a message',

  }
});

messageSchema.pre('save', function(next) {
  if(!this.isModified('body')) {
    next(); // skip it
    return; // stop this function from running
    // or return next();
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resilient so slugs are unique
});

module.exports = mongoose.model('Message', messageSchema);
