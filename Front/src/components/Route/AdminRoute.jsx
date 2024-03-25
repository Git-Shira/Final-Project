import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Edit from "../../pages/admin/management/edit/Edit";
import Management from "../../pages/admin/management/Management";
import TableAdmin from "../../pages/admin/management/TableAdmin";
import ViewUsers from "../../pages/admin/management/ViewUsers";
import Home from "../../pages/home/Home";

const AdminRoute = () => {
  const user = Cookies.get("user");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    if (user) {

      const details = JSON.parse(user);
      setUserDetails(details?.permission);
      console.log(details.permission);
    }
  }, [user]);

  return (
    <div>
      {userDetails === "admin" ? (
        <Routes>
          <Route path="/Management" element={<Management />} />
          <Route path="/TableAdmin" element={<TableAdmin />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/ViewUsers" element={<ViewUsers />} />
        </Routes>
      ) :(
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      
    </div>
  );
};

export default AdminRoute;