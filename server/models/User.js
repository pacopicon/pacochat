const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // 'global' in the back end is analogous to 'window' in the front end

const uuidv4 = require('uuid/v4'); // for testing 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Enter a name',

  },
  userId: {
    type: String,
    default: uuidv4(),
  },
});

// userSchema.pre('save', function(next) {
//   if(!this.isModified('body')) {
//     next(); // skip it
//     return; // stop this function from running
//     // or return next();
//   }
//   this.slug = slug(this.name);
//   next();
//   // TODO make more resilient so slugs are unique
// });

module.exports = mongoose.model('User', userSchema);
