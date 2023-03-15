module.exports = (mongoose) => {
  const Meal = mongoose.model(
    'meals',
    mongoose.Schema({
      calories: {
        type: Number,
        required: true
      },
      cookTemp: {
        type: String,
        required: true
      },
      cookTime: {
        type: String,
        required: true
      },
      directions: {
        type: String,
        required: true
      },
      ingredientAmounts: {
        type: Array,
        required: true
      },
      ingredientUnits: {
        type: Array,
        required: true
      },
      ingredients: {
        type: Array,
        required: true
      },
      mealName: {
        type: String,
        required: true
      },
      prepTime: {
        type: String,
        required: true
      },
      servings: {
        type: Number,
        required: true
      }
    })
  );
  return Meal;
};
