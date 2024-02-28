import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Edit = ({ id }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [editUser, setEditUser] = useState({
    fullName: id.fullName || "",
    email: id.email || "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log("id", id._id);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/user/${id._id}`
        );
        setUser(response.data.user);
        setUserId(id._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id._id) {
      getUser();
    }
  }, [id._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      fullName: editUser.fullName,
      email: editUser.email,
      password: editUser.password,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/auth/update/${userId}/`,
        userData
      );
      console.log("User updated:", response.data);
      alert("User updated");
      // Optionally display a success message to the user
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
        // Optionally display an error message to the user
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>
      <form onSubmit={handleSubmit}>
        <Box
          component="div"
          sx={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={editUser.fullName}
            onChange={(e) =>
              setEditUser({ ...editUser, fullName: e.target.value })
            }
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            variant="outlined"
            fullWidth
            value={editUser.password}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Update
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Edit;
