const db = require('../models');
const Meal = db.meal;

//Define a function to get all meals
const getMeals = (req, res) => {
  Meal.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving meals.'
      });
    });
};

//Define a function to get one meal by id
const getOneMeal = (req, res) => {
  const mealName = req.params.mealName;
  Meal.find({ mealName: mealName })
    .then((data) => {
      if (!data) res.status(404).send({ message: mealName + ' not found.' });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving meal with name: ' + mealName,
        error: err
      });
    });
};

//Define a function to post one meal to meals list
const addMeal = (req, res) => {
  const newMeal = new Meal(req.body);
  newMeal
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the meal.'
      });
    });
};
/*
//Define a function to change a contact's data by their id
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Contact not updated. Try again.');
  }
};

//Define a function to delete a contact by id
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('Contacts')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || ' Contact not deleted. Try again.');
  }
};*/

module.exports = { getMeals, addMeal, getOneMeal /*, updateContact, deleteContact*/ };
