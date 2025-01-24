const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

// Routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
