import fs from "fs/promises";
import path from "path";
import { getJSONFileData } from "./utils/utils.js";
import { read } from "fs";

export const getAllDishes = async (req, res) => {
  try {
    // Read the JSON file
    const dishesData = await getJSONFileData();
    return res.status(200).json({ data: dishesData });
  } catch (error) {
    console.error("Error reading file:", error);
    return res.status(500).json({ message: "Failed to load dish data" });
  }
};

export const getDishById = async (req, res) => {
  try {
    const dishesData = await getJSONFileData();

    // Find the dish by id
    const dish = dishesData.find((dish) => dish.id === req.params.id);
    if (!dish) {
      return res.status(404).json({ data: {}, message: "Dish not found" });
    }
    return res.status(200).json({ data: dish });
  } catch (error) {
    console.error("Error reading file:", error);
    return res.status(500).json({ message: "Failed to load dish data" });
  }
};

export const getDishByIngredient = async (req, res) => {
    try {
        const { ingredients } = req.body;
    
        if (!ingredients || !Array.isArray(ingredients)) {
          return res.status(400).json({ message: "Ingredients must be an array." });
        }
    
        const dishesData = await getJSONFileData();
    
        // Filter dishes that can be made with the provided ingredients
        const matchingDishes = dishesData.filter((dish) =>
          dish.ingredients.every((ingredient) => ingredients.includes(ingredient))
        );
    
        if (matchingDishes.length > 0) {
          res.status(200).json(matchingDishes);
        } else {
          res.status(404).json({ message: "No dishes can be made with the provided ingredients." });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error." });
      }
};
