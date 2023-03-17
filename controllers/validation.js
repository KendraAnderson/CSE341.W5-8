//const { check, validationResult } = require('express-validator');
const validator = require('validator');

const valMealArrays = (meal) => {
  var valid = true;

  if (
    !Array.isArray(meal.ingredientAmounts) ||
    !Array.isArray(meal.ingredientUnits) ||
    !Array.isArray(meal.ingredients)
  ) {
    valid = false;
  }

  return valid;
};

/*const valMealStrings = (meal) => {
  var valid = true;

  if (!isString(meal.cookTemp)) {
    valid = false;
  } else if (!isString(meal.cookTime)) {
    valid = false;
  } else if (!isString(meal.directions)) {
    valid = false;
  } else if (!isString(meal.prepTime)) {
    valid = false;
  } else if (!isString(meal.servings)) {
    valid = false;
  }

  return valid;
};*/

const valMealNums = (meal) => {
  var valid = true;

  if (!validator.isNumeric(meal.calories) || !validator.isNumeric(meal.servings)) {
    valid = false;
  }

  return valid;
};

const valEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

const passwordComplexity = require('joi-password-complexity');
const complexityOptions = {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

const passwordPass = (passwordToCheck) => {
  return passwordComplexity(complexityOptions, 'Password').validate(passwordToCheck);
};

module.exports = { valEmail, valMealArrays, /*valMealStrings, */ valMealNums, passwordPass };
