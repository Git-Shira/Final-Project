import React, { useState } from "react";
import { Container, Typography, TextField, Button, IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDe, setUserDe] = useState({});

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // to add here
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      const user = response.data.user;
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      if (user.permission === "admin") {
        navigation("/Admin/Management");
        alert("התחברת בהצלחה");
      } else {
        navigation("/");
        alert("התחברת בהצלחה");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container maxWidth="sm">
      <div>
        <Typography variant="h4" component="h2" align="center">
          התחברות
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Sign In
          </Button>
        </form>
        <Typography variant="body1" align="center">
          Don't have an account? <Link to={"/SignUp"}>Sign up </Link>
        </Typography>
        <Typography variant="body1" align="center">
          <Link to={"/ForgotPassword"}>שכחתי סיסמא </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default SingIn;
