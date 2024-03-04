import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { format } from 'date-fns';

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [vaildationError, setVaildationError] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const Validate = () => {
    const error = {};
    if (!fullName) {
      error.fullName = "שדה חובה";
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(fullName)) {
      error.fullName = "אנא הכנס שם מלא תקני, ללא רווחים רקים בתחילה או בסוף";
    }
    if (!email) {
      error.email = "שדה חובה";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "המייל אינו תקין";
    }
    if (!password) {
      error.password = "שדה חובה";
    } else if (password.length < 6) {
      error.password = "הסיסמא חייבת להיות באורך של 6 תווים לפחות";
    }
    if (!date) {
      error.date = "שדה חובה";
    }
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Validate()) {
      const dataObj = new Date(date);
      // const year = dataObj.getFullYear();
      // const month = dataObj.getMonth() + 1;
      // const day = dataObj.getDate();
      // const newDate = `${year}-${month}-${day}`;
      const dateFormat = 'dd/MM/yyyy';
      const formattedDate = format(dataObj, dateFormat);
      const userData = {
        fullName: fullName,
        email: email,
        password: password,
        // date: newDate,
        date: formattedDate
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/register",
          userData,
          config
        );
        console.log(response.status);

        if (response.status === 200) {
          setError("ההרשמה בוצעה בהצלחה");
          setTimeout(() => {
            navigate("/singin");
          }, 2000);
        }
      } catch (error) {
        if (error.response.status === 409) {
          setError("המייל כבר קיים במערכת");
        }
        console.error(error);
        // You might also want to display a more user-friendly error message
      }
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
          required
          error={vaildationError.fullName}
          helperText={vaildationError.fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="date"
          label="תאריך לידה"
          variant="outlined"
          required
          onChange={(e) => setDate(e.target.value)}
          helperText={vaildationError.date}
          error={vaildationError.date}
          inputProps={{
            pattern: "\\d{4}-\\d{2}-\\d{2}",
            title: "Please use the yyyy-mm-dd format",
          }}
        />
        <TextField
          id="outlined-basic"
          label="אימייל"
          type={"email"}
          required
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={vaildationError.email}
          helperText={vaildationError.email}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle password visibility
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={vaildationError.password}
          helperText={vaildationError.password}
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
        <Button variant="contained" onClick={submitHandler}>
          הרשמה
        </Button>
        {error && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}
      </Box>
    </div>
  );
};

export default SignUp;
