import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Edit from "../../pages/user/edit/Edit";
import Header from "../header/Header";
import Profile from "../../pages/user/profile/Profile";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const UserRoute = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Drawer variant="permanent" anchor="left">
          <List style={{}}>
            <ListItem button component={Link} to="profile/">
              <ListItemText primary="פרופיל" />
            </ListItem>
            <ListItem button component={Link} to="edit/">
              <ListItemText primary="עריכת פרופיל" />
            </ListItem>
            <ListItem button component={Link} to="/Products">
              <ListItemText primary="התנתקות" />
            </ListItem>
          </List>
        </Drawer>
      </div>

      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
