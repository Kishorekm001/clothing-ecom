import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import Home from "./views/home";
import Shop from "./views/shop";
import Authentication from "./views/Authentication";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
