const Recipe = require("../models/Recipe");

const recipeController = {

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

    // Create a new recipe
    createRecipe: async (req, res) => {
        try {
            const recipes = req.body;
    
            if (!Array.isArray(recipes)) {
                return res.status(400).json({ message: "Request body must be an array of recipes" });
            }
    
            // Validate each recipe
            for (let recipe of recipes) {
                if (!recipe.title || !recipe.steps || !Array.isArray(recipe.ingredients)) {
                    return res.status(400).json({
                        message: "Each recipe must have a title, ingredients (array), and steps.",
                    });
                }
            }
    
            const savedRecipes = await Recipe.insertMany(recipes);
            res.status(201).json(savedRecipes);
        } catch (error) {
            console.error(error.message);
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
    }
}

module.exports = recipeController;