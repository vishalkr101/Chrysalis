import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const renderCard = (dish) => {
  const { id } = dish;
  const name = dish.name === "-1" ? "" : dish.name;
  const ingredients =
    dish.ingredients === "-1" ? "" : dish.ingredients.join(", ");
  const diet = dish.diet === "-1" ? "" : dish.diet;
  const flavor_profile =
    dish.flavor_profile === "-1" ? "" : dish.flavor_profile;
  const state = dish.state === "-1" ? "" : dish.state;
  const region = dish.region === "-1" ? "" : dish.region;

  return (
    <Link to={`/dish/${id}`} className="dish-card-link" key={id}>
      <div className="dish-card" key={id}>
        {name && (
          <>
            <h3>{dish.name}</h3>
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
          </>
        )}
      </div>
    </Link>
  );
};
