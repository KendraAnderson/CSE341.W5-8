const { check, validationResult } = require('express-validator');

const valMealArrays = (meal) => {
  const valid = True;

  if (!isArray(meal.ingredientAmounts)) {
    valid = False;
  } else if (!isArray(meal.ingredientUnits)) {
    valid = False;
  } else if (!isArray(meal.ingredients)) {
    valid = False;
  }

  return valid;
};

const valMealStrings = (meal) => {
  const valid = True;

  if (!isString(meal.cookTemp)) {
    valid = False;
  } else if (!isString(meal.cookTime)) {
    valid = False;
  } else if (!isString(meal.directions)) {
    valid = False;
  } else if (!isString(meal.prepTime)) {
    valid = False;
  } else if (!isString(meal.servings)) {
    valid = False;
  }

  return valid;
}

const valMealNums = (meal) => {
  const valid = True;

  if (!isNumeric(meal.calories)) {
    valid = False;
  } else if (!isNumeric(meal.servings)) {
    valid = False;
  }

  return valid;
}

const valEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

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

module.exports = { valEmail, valMealArrays, valMealStrings, valMealNums, passwordPass }