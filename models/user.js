module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    email: {
      type: String
    },
    password: {
      type: String
    }
  });

  return mongoose.model('users', userSchema);
};
