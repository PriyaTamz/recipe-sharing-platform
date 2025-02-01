const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or base64-encoded string for the image
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
