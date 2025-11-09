const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../../models/serviceModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'));

mongoose.connection.on('connected', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});

//   READ JSON FILE
const services = JSON.parse(
  fs.readFileSync(`${__dirname}/services.json`, 'utf-8')
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Service.create(services);
    // await User.create(users, { validateBeforeSave: false }); //To turn off validation while importing since there is already a password in dev data
    console.log('Data sucessfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Service.deleteMany();
    await User.deleteMany();
    console.log('Data sucessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
