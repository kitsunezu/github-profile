import React from "react";
import GetName from "./pages/GetName";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

const App = () => (
  <Routes>
    <Route path="/" element={<GetName />} />
    <Route path="/:paramsName" element={<Profile />} />
  </Routes>
);

export default App;

