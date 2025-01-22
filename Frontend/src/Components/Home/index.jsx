import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { DishContext } from "../Context";

const HomePage = () => {
  const { dishes, loading, error } = useContext(DishContext);

  const rowsPerPage = 10; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [vegChecked, setVegChecked] = useState(false);
  const [nonVegChecked, setNonVegChecked] = useState(false);

  const handleFieldDisplay = (value, isTimeField) => {
    if (value === "-1") return "Not Available";
    else if (isTimeField) return `${value} mins`;
    return value;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleFilter = (data) => {
    if (!vegChecked && !nonVegChecked) {
      return data;
    }
    return data.filter((dish) => {
      if (vegChecked && dish.diet.toLowerCase() === "vegetarian") return true;
      if (nonVegChecked && dish.diet.toLowerCase() === "non vegetarian")
        return true;
      return false;
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Step 1: Get paginated data
  const currentDishes = dishes.slice(indexOfFirstRow, indexOfLastRow);

  // Step 2: Filter the current page's data
  const filteredDishes = handleFilter(currentDishes);

  // Step 3: Sort the filtered data
  const sortedFilteredDishes = getSortedData(filteredDishes);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(dishes.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "🔼" : "🔽";
    }
    return "↕️"; // Neutral icon for unsorted columns
  };

  if (loading) return <div className="loading-text">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <h1 className="dishes-heading">Dishes</h1>
      <div className="dish-container">
        <table className="dishes-table">
          <thead>
            <tr className="table-head-row">
              <th onClick={() => handleSort("name")} className="sorted-column">
                Dish Name {renderSortIcon("name")}
              </th>
              <th>Ingredients</th>
              <th>
                <div>Diet</div>
                <label className="diet-checkbox">
                  Veg
                  <input
                    type="checkbox"
                    checked={vegChecked}
                    onChange={(e) => setVegChecked(e.target.checked)}
                  />
                </label>
                <label className="diet-checkbox">
                  Non-Veg
                  <input
                    type="checkbox"
                    checked={nonVegChecked}
                    onChange={(e) => setNonVegChecked(e.target.checked)}
                  />
                </label>
              </th>
              <th
                onClick={() => handleSort("prep_time")}
                className="sorted-column"
              >
                Preparation Time {renderSortIcon("prep_time")}
              </th>
              <th
                onClick={() => handleSort("cook_time")}
                className="sorted-column"
              >
                Cooking Time {renderSortIcon("cook_time")}
              </th>
              <th>Flavour Profile</th>
              <th>Course</th>
              <th>State</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {sortedFilteredDishes.map((dish) => (
              <tr key={dish.id} className="table-data-row">
                <td className="table-data">
                  <Link to={`/dish/${dish.id}`} className="dish-name-link">
                    {handleFieldDisplay(dish.name)}
                  </Link>
                </td>
                <td className="table-data">
                  {handleFieldDisplay(dish.ingredients.join(", "))}
                </td>
                <td className="table-data">{handleFieldDisplay(dish.diet)}</td>
                <td className="table-data">
                  {handleFieldDisplay(dish.prep_time, true)}
                </td>
                <td className="table-data">
                  {handleFieldDisplay(dish.cook_time, true)}
                </td>
                <td className="table-data">
                  {handleFieldDisplay(dish.flavor_profile)}
                </td>
                <td className="table-data">
                  {handleFieldDisplay(dish.course)}
                </td>
                <td className="table-data">{handleFieldDisplay(dish.state)}</td>
                <td className="table-data">
                  {handleFieldDisplay(dish.region)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentDishes.length > 0 && (
        <div className="pagination-controls">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {Math.ceil(dishes.length / rowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(dishes.length / rowsPerPage)}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
