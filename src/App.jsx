
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./MovieContext";
import NavBar from "./NavBar";
import Home from "./Home";
import Favorites from "./Favorites";
import "./App.css";

export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}
