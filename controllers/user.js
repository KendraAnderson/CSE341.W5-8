const db = require('../models');
const util = require('./validation');
const User = db.user;
const bcrypt = require('bcrypt');

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
    // Check that password meets requirements
    const password = req.body.password;
    const passwordCheck = util.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    // Check for valid email
    const email = req.body.email;
    if (!util.valEmail(email)) {
      res.status(400).send({ message: 'Email not valid.' });
    } else {
      User.findOne({ email: user.email }, function (err, withSameMail) {
        if (err || withSameMail) {
          //client.close();
          return callback(err || new Error('User already exists.'));
        }
      });
      const user = new User(req.body);

      user.save()
        .then((data) => {
          res.status(201).send(data);
          console.log('User created.');
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while creating user.');
  }
};
// Hash password - unused
/*const hash = bcrypt.hash(password, 10, function (err, hash) {
  if (err) {
    //client.close();
    return callback(err);
  } else {
    return hash;
  }
});
req.body.password = hash;

// Another unused hash version
const user = new User(req.body);
User.findOne({ email: user.email }, function (err, withSameMail) {
  if (err || withSameMail) {
    //client.close();
    return callback(err || new Error('the user already exists'));
  }

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      //client.close();
      return callback(err);
    }
    res.send("pommes" + hash);
    user.password = hash;
    User.insert(user, function (err, inserted) {
      //client.close();

      if (err) return callback(err);
      callback(null);
    });
  });
});*/

// Unused previous version of create with hash
/*const create = (req, res) => {
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
    const saltRounds = 10;
    bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        res.send(`Hash: ${hash}`);
        // Store hash in your password DB.
        const user = {
          email: req.body.email,
          password: hash
        };

        user.save()
          .then((data) => {
            res.status(201).send(data);
            console.log('User created.');
          })
      })
      .catch(err => console.error(err.message));
    res.send('pommes');
    res.send('pommes2');
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while creating user.');
  }
};*/

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
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    const email = req.params.email;
    const result = await User.replaceOne({ email: email }, user);
    console.log(`${result.modifiedCount} user(s) updated: ` + email);
    if (result.modifiedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while updating user.');
  }
};
/*const updateUser = async (req, res) => {
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
      password: req.body.password
    }
    user.save()
      .then((data) => {
        res.status(201).send(data);
        console.log(`User (${user.email}) changed.`);
      });
  //});
} catch (err) {
  console.log(err);
  res.status(500).json(err || 'Some error occured while updating user.');
}
};*/

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
