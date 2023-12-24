import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Edit from "../../pages/user/edit/Edit";
import Header from "../header/Header";
const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
