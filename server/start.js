const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('please update node to >7.6');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });


mongoose.connect(process.env.DATABASE); // 'dotenv' grabs variables located in 'variables.env' and prefixing these with 'process.env' (process.env.DATABASE)
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`error: → ${err.message}`);
});


// models
require('./models/Message');


// Start our app
const app = require('./app');

const http = require('http').Server(app);
const io = require('socket.io')(http);



app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});