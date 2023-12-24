import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Grid } from "@mui/material";

const Edit = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const [editUser, setEditUser] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    password: user.password || "",
  });

  useEffect(() => {
    const userJson = JSON.parse(localStorage.getItem("user"));
    if (userJson) {
      console.log(userJson);
      setUserDetails(userJson);
      setId(userJson.user._id);
    }
  }, []);

  const getUser = async () => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3000/auth/user/${id}`);
      console.log("ddd", response);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]);
  console.log(user.email);
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const userData = {
      fullName: editUser.fullName,
      email: editUser.email,
      password: editUser.password,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/products/update/${user._id}`,
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Edit</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              component="form"
              style={{
                width: "500px",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
              }}
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="שם מלא"
                variant="outlined"
                onChange={(e) =>
                  setEditUser({ ...editUser, fullName: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="אימייל"
                type={"email"}
                variant="outlined"
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="סיסמא"
                type={"password"}
                variant="outlined"
                onChange={(e) =>
                  setEditUser({ ...editUser, password: e.target.value })
                }
              />
              <Button variant="contained" type="submit">
                עידכון
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
