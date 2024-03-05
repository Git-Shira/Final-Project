import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Edit from "../../pages/user/edit/Edit";
import Header from "../header/Header";
import Profile from "../../pages/user/profile/Profile";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Cookies from "js-cookie";
import Favorites from "../../pages/favorite/Favorites";

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
      {/* <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      }}
    >
      <Drawer variant="permanent" anchor="left">
        <List>
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
    </div> */}

      <Routes>
        <Route path="/profile" element={<Profile id={id} />} />
        <Route path="/edit" element={<Edit id={id} />} />
      </Routes>
    </div>
  );
};

export default UserRoute;
