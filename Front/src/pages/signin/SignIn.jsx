import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDe, setUserDe] = useState({});
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      navigation("/");
      alert("התחברת בהצלחה");
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
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
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
      </div>
    </Container>
  );
};

export default SignIn;
