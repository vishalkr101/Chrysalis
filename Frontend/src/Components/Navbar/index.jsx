import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DishContext } from "../Context";
import "./index.css";

const Navbar = () => {
  const { dishes } = useContext(DishContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query) {
      const filteredSuggestions = dishes.filter((dish) => {
        
        const lowerCaseQuery = query.toLowerCase();
        
        return (
          dish.name.toLowerCase().includes(lowerCaseQuery) ||
          dish.ingredients.join(" ").toLowerCase().includes(lowerCaseQuery) ||
          dish.state.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (dishId) => {
    navigate(`/dish/${dishId}`);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <nav>
  <div className="navbar-container">
    {/* Logo */}
    <div onClick={() => navigate('/')}>
      Chrysalis
    </div>

    <div className="dish-suggestor-link" onClick={() => navigate('/dish-suggestor')}>
        Find your Dish with Dish Suggestor
    </div>

    {/* Search Input */}
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Search for dishes..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((dish) => (
            <li
              key={dish.id}
              onClick={() => handleSuggestionClick(dish.id)}
              className="suggestion-item"
            >
              {dish.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
