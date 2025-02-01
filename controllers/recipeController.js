const Recipe = require("../models/Recipe");

const recipeController = {
    // Fetch all recipes
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find(); // Fetch all recipes
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },

    // Fetch a single recipe by ID
    getRecipeById: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) return res.status(404).json({ message: "Recipe not found" });
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },

    // Create one or more recipes
    createRecipe: async (req, res) => {
        try {
            const recipe = req.body;

            // Validate the recipe fields
            if (!recipe.title || !recipe.description || !recipe.ingredients || !recipe.steps) {
                return res.status(400).json({
                    message: "Recipe must have a title, description, ingredients (string), and steps.",
                });
            }

            // Ensure ingredients is a string (if it's an array, convert it to a string)
            // This is unnecessary since ingredients should already be a string from frontend
            if (Array.isArray(recipe.ingredients)) {
                recipe.ingredients = recipe.ingredients.join(",");  // If it's an array, convert to string
            }

            // Save the recipe (ingredients will be stored as a string)
            const savedRecipe = await Recipe.create(recipe);
            res.status(201).json(savedRecipe);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // Update a recipe
    updateRecipe: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            // Update the recipe
            const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
                new: true,
                runValidators: true,
            });

            if (!updatedRecipe) {
                return res.status(404).json({ message: "Recipe not found" });
            }

            res.status(200).json(updatedRecipe);
        } catch (error) {
            console.error("Error during update:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // Delete a recipe
    deleteRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.findByIdAndDelete(req.params.id);
            if (!recipe) return res.status(404).json({ message: "Recipe not found" });
            res.status(200).json({ message: "Recipe deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },
};

module.exports = recipeController;
