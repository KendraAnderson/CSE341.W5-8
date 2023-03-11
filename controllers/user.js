const db = require('../models');
const passwordUtil = require('./validation');
const User = db.user;

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

// Define a function to get one user by username
const getUser = (req, res) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        if (!data[0]) {
          res.status(404).send({ message: username + ' not found.' });
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
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Please fill in all fields!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = new User(req.body);
    user.save()
      .then((data) => {
        res.status(201).send(data);
        console.log('User created.');
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while creating user.');
  }
};

//Define a function to change a user's data by their username
const updateUser = async (req, res) => {
  try {

    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Please fill in all fields!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = {
      username: req.body.username,
      password: req.body.password
    }

    const username = req.params.username;    
    const result = await User.replaceOne({ username: username }, user);
    console.log(`${result.modifiedCount} user(s) updated: ` + username);
    if (result.modifiedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while updating user.');
  }
};

//Define a function to delete a user by username
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await User.deleteOne({ username: username });
    console.log(`${result.deletedCount} user(s) deleted: ` + username);
    if (result.deletedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occurred while deleting the user.');
  }
};

module.exports = { getAll, create, getUser, deleteUser, updateUser };
