import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import Edit from "../../pages/user/edit/Edit";
import Profile from "../../pages/user/profile/Profile";

const UserRoute = () => {
  const [id, setId] = React.useState("");
  const token = Cookies.get("user");
  console.log("token", JSON.parse(token));

  useState(() => {
    if (token) {
      setId(JSON.parse(token));
    }
  }, []);
  
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Profile id={id} />} />
        <Route path="/edit" element={<Edit id={id} />} />
      </Routes>
    </div>
  );
};

export default UserRoute;