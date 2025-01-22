import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const DishSuggestor = () => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/all-ingredients"
        );
        setAllIngredients(response.data.ingredients || []);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
      }
    };

    fetchIngredients();
  }, []);

  // Handle input change for ingredient search
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query) {
      const filteredSuggestions = allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Add an ingredient to the selected list and clear search
  const handleSuggestionClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  // Remove an ingredient from the selected list
  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  // Send selected ingredients to the backend and get dishes
  const handleSuggestDishes = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/dish-by-ingredients",
        { ingredients: selectedIngredients },
        { headers: { "Content-Type": "application/json" } }
      );
      setDishes(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="dish-suggestor-container">
      <h1>Dish Suggestor</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for ingredients..."
          value={searchTerm}
          onChange={handleInputChange}
          className="ingredient-search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((ingredient, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(ingredient)}
                className="suggestion-item"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="selected-ingredients">
        {selectedIngredients.map((ingredient, index) => (
          <span key={index} className="selected-ingredient">
            {ingredient}
            <button
              onClick={() => handleRemoveIngredient(ingredient)}
              className="remove-button"
            >
              ✖
            </button>
          </span>
        ))}
      </div>

      <button onClick={handleSuggestDishes} className="suggest-dishes-button">
        Get Dishes
      </button>

      {error && <p className="error-message">{error}</p>}

      <ul className="dishes-list">
        {dishes.map((dish, index) => (
          <li key={index} className="dish-item">
            <p>Dish Name: {dish.name}</p>
            <p>Ingredients: {dish.ingredients.join(", ")}</p>
            <p>Diet: {dish.diet}</p>
            <p>Preparation Time: {dish.prep_time} mins</p>
            <p>Cooking Time: {dish.cook_time} mins</p>
            <p>Flavour Profile: {dish.flavor_profile}</p>
            <p>Course: {dish.course}</p>
            <p>State: {dish.state}</p>
            <p>Region: {dish.region}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishSuggestor;
