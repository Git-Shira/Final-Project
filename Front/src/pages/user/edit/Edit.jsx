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
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Edit = ({ id }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vaildationError, setVaildationError] = useState({});

  const navigate = useNavigate();

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

  const Validate = () => {
    const error = {};
    if (!editUser.fullName) {
      error.editUser.fullName = "שדה חובה";
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(editUser.fullName)) {
      error.editUser.fullName = "אנא הכנס שם מלא תקני, ללא רווחים רקים בתחילה או בסוף";
    }
    if (!editUser.email) {
      error.editUser.email = "שדה חובה";
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      error.editUser.email = "המייל אינו תקין";
    }
    if (!editUser.password) {
      error.editUser.password = "שדה חובה";
    } else if (editUser.password.length < 6) {
      error.editUser.password = "הסיסמא חייבת להיות באורך של 6 תווים לפחות";
    }
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Validate()) {
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
        // if (response.status === 200) {
          // setSuccess("העדכון בוצע בהצלחה");
          // setTimeout(() => {
            navigate("/User/profile");
          // }, 2000);
          alert("User updated");
        // }

      } catch (error) {
        // if (error.response.status === 404) {
        //   setError("המשתמש לא קיים במערכת");
        // }
        // if (error.response.status === 500) {
        //   setError("משהו השתבש, נסו שוב")
        // }
        console.error("Error updating user:", error);
        if (error.response) {
          console.error("Server Error Response:", error.response.data);
        }
      // }
    }
  };

  return (
    <Container sx={{ marginTop: 100 }}>
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
            color="error"
            required
          error={vaildationError.fullName}
          helperText={vaildationError.fullName}
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
            color="error"
            required
            error={vaildationError.email}
            helperText={vaildationError.email}
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
            color="error"
            required
            error={vaildationError.password}
            helperText={vaildationError.password}
          />
          <Button variant="contained" type="submit" fullWidth>
            Update
          </Button>
        </Box>
      </form>
      {success && (<Alert severity="success"
      >
        {success}
      </Alert>)
      }
      {error && (
        <Alert severity="error"
        >
          {error}
        </Alert>)}
    </Container>
  );
};

export default Edit;
