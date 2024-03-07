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
import AOS from 'aos';

import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

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
    } else if (!/^[א-ת]+( [א-ת]+)*$/.test(editUser.fullName)) {
      error.editUser.fullName = "אנא הכנס שם מלא תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (!editUser.email) {
      error.editUser.email = "שדה חובה";
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      error.editUser.email = "המייל אינו תקין";
    }
    if (!editUser.password) {
      error.editUser.password = "שדה חובה";
    } else if (editUser.password.length < 8) {
      error.editUser.password = "הסיסמא חייבת להיות באורך של 8 תווים לפחות";
    }
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validate()) {
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
      if (response.status === 200) {
      setSuccess("העדכון בוצע בהצלחה");
      setTimeout(() => {
      navigate("/User/profile");
      }, 2000);
      alert("User updated");
      }

    } catch (error) {
      if (error.response.status === 404) {
        setError("המשתמש לא קיים במערכת");
      }
      if (error.response.status === 500) {
        setError("משהו השתבש, נסו שוב")
      }
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
      }
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
        <Container sx={{ minHeight:610 ,textAlign:"center",}}>

      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">עריכת פרטים</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>

      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          className="edit-profile-user"
          sx={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            "& > :not(style)": { m: 1 },
            marginTop:3
          }}
        >
          <TextField
            id="fullName"
            label="שם מלא"
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
            label="כתובת דוא''ל"
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
          <button variant="contained" type="submit" className="btn btn-shadow" style={{marginTop:40,width:150,fontSize:"x-large"}}>
            עדכון
          </button>
        </Box>
      </form>
      {success && (<Alert severity="success" style={{margin:"0 auto",width:500,justifyContent:"center"}}
      >
        {success}
      </Alert>)
      }
      {error && (
        <Alert severity="error" style={{margin:"0 auto",width:500,justifyContent:"center"}}
        >
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Edit;
