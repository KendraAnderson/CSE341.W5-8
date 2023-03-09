module.exports = (mongoose) => {
  const Meal = mongoose.model(
    'meals',
    mongoose.Schema({
      calories: {
        type: Number
      },
      cookTemp: {
        type: String
      },
      cookTime: {
        type: String
      },
      directions: {
        type: String
      },
      ingredientAmounts: {
        type: Array
      },
      ingredientUnits: {
        type: Array
      },
      ingredients: {
        type: Array
      },
      mealName: {
        type: String
      },
      prepTime: {
        type: String
      },
      servings: {
        type: Number
      }
    })
  );
  return Meal;
};
