const db = require('../models');
const passwordUtil = require('./validation');
const User = db.user;
const bcrypt = require('bcryptjs');

// Define a function to get all users
const getAll = (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.send(data);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while retrieving users.');
  }
};

// Define a function to get one user by email
const getUser = (req, res) => {
  try {
    const email = req.params.email;
    User.find({ email: email })
      .then((data) => {
        if (!data[0]) {
          res.status(404).send({ message: email + ' not found.' });
        }
        res.status(200).json(data[0]);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while retrieving user.');
  }
};

// Define a function to create a user
const create = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Please fill in all fields!' });
      return;
    }

    const email = req.params.email;
    // Check to see if user already exists then hash
    User.findOne({ email: email }, function (err, withSameMail) {
      if (err || withSameMail) {
        client.close();
        return callback(err || new Error('the user already exists'));
      }
    });
    const password = req.body.password;
    // Check password for requirements
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    // Hash password
    const hash = bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        //client.close();
        return callback(err);
      } else {
        return hash;
      }
    });
    const user = new User(req.body);

    user.password = hash;
    //user.email_verified = false;
    user.email = email;
    /*User.insert(user, function (err, inserted) {
      //client.close();
      
      if (err) return callback(err);
      callback(null);
    });*/
    user.save()
      .then((data) => {
        res.status(201).send(data);
        console.log(`User (${user.email}) created.`);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while creating user.');
  }
};

//Define a function to change a user's data by their email
const updateUser = async (req, res) => {
  try {

    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Please fill in all fields!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    // Hash password
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        //client.close();
        return callback(err);
      }
      const newPass = hash;
      const user = {
        email: req.body.email,
        password: newPass
      }
      user.save()
        .then((data) => {
          res.status(201).send(data);
          console.log(`User (${user.email}) changed.`);
        });
    });
    /*const result = await User.replaceOne({ email: email }, user);
    console.log(`${result.modifiedCount} user(s) updated: ` + email);
    if (result.modifiedCount > 0) {
      res.status(204).send(result);
    }*/

  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while updating user.');
  }
};

//Define a function to delete a user by email
const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await User.deleteOne({ email: email });
    console.log(`${result.deletedCount} user(s) deleted: ` + email);
    if (result.deletedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occurred while deleting the user.');
  }
};

module.exports = { getAll, create, getUser, deleteUser, updateUser };
