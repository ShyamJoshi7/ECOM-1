import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBanner from "./components/topBanner";
import Navbar from "./components/navbar.component";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
