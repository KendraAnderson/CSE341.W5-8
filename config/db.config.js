const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: process.env.MONGODB_URI || 'mongodb+srv://kortask:qwer1234@cluster0.uadi7m1.mongodb.net/Recipes'
};
