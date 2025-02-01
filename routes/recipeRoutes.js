const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe, // Importing the updateRecipe function
  deleteRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

// Routes
router.get("/", getAllRecipes);               // Get all recipes
router.get("/:id", getRecipeById);            // Get a single recipe by ID
router.post("/", createRecipe);               // Create one or more recipes
router.put("/:id", updateRecipe);             // Update a recipe by ID
router.delete("/:id", deleteRecipe);         // Delete a recipe by ID

module.exports = router;
