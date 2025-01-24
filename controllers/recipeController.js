const Recipe = require("../models/Recipe");

const recipeController = {
    getAllRecipes: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) return res.status(404).json({ message: "Recipe not found" });
            res.status(200).json(recipe);
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
            const { title, ingredients, steps, image } = req.body;
            const recipe = new Recipe({ title, ingredients, steps, image });
            await recipe.save();
            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
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