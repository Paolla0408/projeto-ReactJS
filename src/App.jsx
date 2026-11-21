import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Detalhes from "./pages/Detalhes";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Catalogo />} />
          <Route path="/filme/:id" element={<Detalhes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}