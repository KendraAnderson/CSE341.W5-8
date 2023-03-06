const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Define a function to get all meals
const getMeals = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Meals').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

//Define a function to get one meal by id
const getOneMeal = async (req, res) => {
  const mealNum = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Meals').find({ _id: mealNum });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

/*
//Define a function to post one contact to contacts list
const addContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('Contacts').insertOne(newContact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Contact not created. Try again.');
  }
};

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

module.exports = { getMeals, getOneMeal/*, addContact, updateContact, deleteContact*/ };
