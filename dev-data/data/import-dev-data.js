// const fs = require('fs');
// const mongoose = require('mongoose')

// const dotenv = require('dotenv');
// const Tour = require('../../models/tourModel');

// dotenv.config({ path: './confing.env' });

// // console.log(app.get('env'));
// console.log(process.env);

// mongoose.connect(process.env.CONN_STR, {
//   useNewUrlParser: true
// }).then((conn) => {
//   //console.log(conn);
//   console.log('DB Connection Successful');
// }).catch((error) => {
//   console.log('Some error hass occured')
// });

// //READ JSON FILE
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );

// //IMPORT DATA INTO DB
// const importData = async () => {
//     try{
//         await Tour.create(tours);
//         console.log('Data successfuly loaded!')
//     }catch (err){
//         console.log(err)
//     }
// };

// //DELETE ALL DATA FROM DB
// const deleteData = async () => {
//     try{
//         await Tour.deleteMany();
//         console.log('Data successfuly deleted!')
//     } catch (err){
//         console.log(err);
//     }
// }

// if(process.argv[2] === '--import'){
//     importData()
// }else if(process.argv[2] === '--delete'){
//     deleteData();
// }
