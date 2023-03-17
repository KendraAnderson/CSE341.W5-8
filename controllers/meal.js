const db = require('../models');
const Meal = db.meal;
const util = require('./validation');

// Define a function to get all meals
const getMeals = (req, res) => {
  try {
    Meal.find({}).then((data) => {
      res.send(data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while retrieving meals.');
  }
};

// Define a function to get one meal by id
const getOneMeal = (req, res) => {
  try {
    const mealName = req.params.mealName;
    Meal.find({ mealName: mealName }).then((data) => {
      if (!data[0]) {
        res.status(404).send({ message: mealName + ' not found.' });
      }
      res.status(200).json(data[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while retrieving meal.');
  }
};

// Define a function to post one meal to meals list
const addMeal = (req, res) => {
  try {
    if (
      !req.body.calories ||
      !req.body.cookTemp ||
      !req.body.cookTime ||
      !req.body.directions ||
      !req.body.ingredientAmounts ||
      !req.body.ingredientUnits ||
      !req.body.ingredients ||
      !req.body.mealName ||
      !req.body.prepTime ||
      !req.body.servings
    ) {
      res.status(400).send({ message: 'Please fill in all fields!' });
      return;
    }

    const mealArrays = {
      ingredientAmounts: req.body.ingredientAmounts,
      ingredientUnits: req.body.ingredientAmounts,
      ingredients: req.body.ingredients
    };
    /*const mealStrings = {
      cookTemp: req.body.cookTemp,
      cookTime: req.body.cookTime,
      directions: req.body.directions,
      mealName: req.body.mealName,
      prepTime: req.body.prepTime
    };*/
    const mealNums = {
      calories: req.body.calories,
      servings: req.body.servings
    };

    if (!util.valMealArrays(mealArrays)) {
      res.status(400).send({ message: 'Ingredient Amounts, Ingredient Units, and Ingredients must be arrays.' });
    } /*else if (!util.valMealStrings(mealStrings)) {
      res.status(400).send({ message: 'Cook Temp, Cook Time, Directions, Prep Time, and Meal Name must be strings.' });
    } else if (!util.valMealNums(mealNums)) {
      res.status(400).send({ message: 'Calories, and Servings must be numbers.' });
    } */
    else {
      const newMeal = new Meal(req.body);
      newMeal.save().then((data) => {
        console.log('Meal Created.');
        res.status(201).send(data);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Some error occured while creating the meal.' });
  }
};

// Define a function to change a meal's data by meal name
const updateMeal = async (req, res) => {
  try {
    const meal = {
      calories: req.body.calories,
      cookTemp: req.body.cookTemp,
      cookTime: req.body.cookTime,
      directions: req.body.directions,
      ingredientAmounts: req.body.ingredientAmounts,
      ingredientUnits: req.body.ingredientUnits,
      ingredients: req.body.ingredients,
      mealName: req.body.mealName,
      prepTime: req.body.prepTime,
      servings: req.body.servings
    };

    const mealName = req.params.mealName;
    const result = await Meal.replaceOne({ mealName: mealName }, meal);
    console.log(`${result.modifiedCount} meal(s) updated: ` + mealName);
    if (result.modifiedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occured while updating meal.');
  }
};

//Define a function to delete a meal by meal name
const deleteMeal = async (req, res) => {
  try {
    const mealName = req.params.mealName;
    const result = await Meal.deleteOne({ mealName: mealName });
    console.log(`${result.deletedCount} meal(s) deleted: ` + mealName);
    if (result.deletedCount > 0) {
      res.status(204).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err || 'Some error occurred while deleting the meal.');
  }
};

module.exports = { getMeals, addMeal, getOneMeal, updateMeal, deleteMeal };
