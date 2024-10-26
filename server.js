/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! >>> SHUTTING DOWN...');
  console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './confing.env' });

const app = require('./app');



// console.log(app.get('env'));
console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
  useNewUrlParser: true
}).then((conn) => {
  //console.log(conn);
  console.log('DB Connection Successful');
})
// .catch((error) => {
//   console.log('Some error hass occured')
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! >>> SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
