const { check, validationResult } = require('express-validator');

const validateMeal = (req, res, next) => {
  check('calories').notEmpty().isInt();
  check('ingredientAmounts').notEmpty().isArray().withMessage('IngredientAmounts are required and must be an array');
  check('ingredientUnits').notEmpty().isArray().withMessage('IngredientUnits are required and must be an array');
  check('ingredients').notEmpty().isArray({ min: 1 }).custom((values) => {
    return values.every(value => typeof value === 'string');
  }).withMessage('Ingredients is required and must be an array of strings');
  check('servings').notEmpty().isInt().withMessage('Servings is required and must be a number');
  
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next;
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

module.exports = { validateMeal, passwordPass }