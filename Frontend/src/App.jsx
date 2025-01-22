import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import DishDetails from "./Components/DishDetails";
import Navbar from "./Components/Navbar";
import { DishProvider } from "./Components/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import DishSuggestor from "./Components/DishSuggestor";

function App() {

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios("http://localhost:3000/all-dishes");
        if (response.statusText !== "OK") {
          throw new Error("Failed to fetch dishes");
        }
        setDishes(response.data.getDishes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false); 
        console.error("Error fetching dishes:", err);
      }
    };

    fetchDishes();
  }, []);
  return (
    <>
      <DishProvider value={{ dishes, setDishes, loading, error }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dish/:id" element={<DishDetails />} />
            <Route path="/dish-suggestor" element={<DishSuggestor />} />
          </Routes>
        </BrowserRouter>
      </DishProvider>
    </>
  );
}

export default App;
