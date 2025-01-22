import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const DishDetails = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    // Fetch dish data based on the id
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dish/${id}`);
        setDish(response.data.dishDetails);
      } catch (err) {
        console.error("Error fetching dish:", err);
      }
    };

    fetchDish();
  }, [id]);

  if (!dish)
    return (
      <div className="dish-details-container">
        Dish details not available...
      </div>
    );

  const name = dish.name === "-1" ? "" : dish.name;
  const ingredients =
    dish.ingredients === "-1" ? "" : dish.ingredients.join(", ");
  const diet = dish.diet === "-1" ? "" : dish.diet;
  const flavor_profile =
    dish.flavor_profile === "-1" ? "" : dish.flavor_profile;
  const state = dish.state === "-1" ? "" : dish.state;
  const region = dish.region === "-1" ? "" : dish.region;

  return (
    <div className="dish-details-container">
      <h3 className="dish-name">{dish.name}</h3>
      <div className="dish-info">
        {ingredients && (
          <p>
            <strong>Ingredients:</strong> {ingredients}
          </p>
        )}
        {diet && (
          <p>
            <strong>Diet:</strong> {dish.diet}
          </p>
        )}
        {flavor_profile && (
          <p>
            <strong>Flavor:</strong> {dish.flavor_profile}
          </p>
        )}
        {state && (
          <p>
            <strong>State:</strong> {dish.state}
          </p>
        )}
        {region && (
          <p>
            <strong>Region:</strong> {dish.region}
          </p>
        )}
      </div>
    </div>
  );
};

export default DishDetails;
