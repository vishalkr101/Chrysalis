import fs from "fs/promises";
import path from "path";

export const getJSONFileData = async () => {
    let dataFilePath = path.join(process.cwd(), "/data.json");
    try {
        // Read the JSON file
        const data = await fs.readFile(dataFilePath, "utf-8");
        const dishesData = JSON.parse(data);
        return dishesData;
      } catch (error) {
        console.error("Error reading file:", error);
        return res.status(500).json({ message: "Failed to load dish data" });
      }
};

export const getUniqueIngredients = (data) => {
    const ingredients = new Set();
  
    data.forEach((dish) => {
      dish.ingredients.forEach((ingredient) => {
        ingredients.add(ingredient.toLowerCase()); // Making ingredients lowercase to avoid duplicates like "Rice" and "rice"
      });
    });
  
    return Array.from(ingredients);
  };