import React from "react";
import { Route, Redirect } from "react-router-dom";
import Edit from "../../pages/admin/edit/Edit";
import Header from "../header/Header";
import Profile from "../../pages/user/profile/Profile";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Management from "../../pages/admin/Management";
import TableAdmin from "../../pages/admin/management/TableAdmin";
import ViewUsers from "../../pages/admin/management/ViewUsers";
import Cookies from "js-cookie";

const AdminRoute = () => {
  const token = Cookies.get("user");

  return (
    <div>
      <Routes>
        <Route path="/Management" element={<Management />} />
        <Route path="/TableAdmin" element={<TableAdmin />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/ViewUsers" element={<ViewUsers/>} />
      </Routes>
    </div>
  );
};

export default AdminRoute;
