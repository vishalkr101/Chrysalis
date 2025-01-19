import fs from "fs";
import path from "path";
import csv from "csv-parser";

// CSV file path
const csvFilePath = path.join(process.cwd(), "/db/indian_food.csv");

const jsonData = [];

let id = 1;

// Read and parse the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    row.id = "" + id++;
    row.ingredients = row.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    jsonData.push(row);
  })
  .on("end", () => {
    // Write the JSON data to a new file
    const jsonFilePath = path.join(process.cwd(), "data.json");
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");
    console.log("CSV has been converted to JSON!");
  })
  .on("error", (err) => {
    console.error("Error reading the CSV file:", err);
  });
