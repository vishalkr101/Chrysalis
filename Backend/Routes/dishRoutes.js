import express from 'express';
import {getAllDishes, getDishById, getDishByIngredient} from '../Controllers/dishControllers.js';

const Router = express.Router();

// Define routes
Router.get('/all-dishes', getAllDishes);
Router.get('/dish/:id', getDishById);
Router.post('/dish-by-ingredients', getDishByIngredient);

export default Router;
