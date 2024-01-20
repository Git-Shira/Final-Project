import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      fullName: fullName,
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/register",
        userData,
        config
      );
      console.log(data);
      navigate("/singin");
      alert("הרשמתך בוצעה בהצלחה");
    } catch (error) {
      console.error(error);
      // You might also want to display a more user-friendly error message
    }
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "red",
          fontSize: "50px",
        }}
      >
        הרשמה
      </h1>
      <Box
        component="form"
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
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="אימייל"
          type={"email"}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="סיסמא"
          type={"password"}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={submitHandler}>
          הרשמה
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
