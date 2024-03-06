import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
          setSuccess("ההרשמה בוצעה בהצלחה");
          setTimeout(() => {
            navigate("/signIn");
          }, 2000);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setError("המייל כבר קיים במערכת");
        }
        if (error.response.status === 500) {
          setError("משהו השתבש, נסו שוב")
        }
        console.error(error);
        // You might also want to display a more user-friendly error message
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

return (
  <div className="harshama" >
    {/* { <h1 className="harshama">הרשמה לאתר</h1> } */}

    <div className="title-design">
      <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
      <h1 data-aos="flip-down" data-aos-duration="1000">הרשמה לאתר</h1>
      <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
    </div>
    <Box
      component="form"
      // sx={{
      //   "& > :not(style)": { m: 1, width: "25ch" },
      // }}
      noValidate
      autoComplete="off"
    >
      <div className="spacer">
        <TextField
          className="rGap"
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          required
          error={vaildationError.fullName}
          helperText={vaildationError.fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ marginLeft: 5 }}
          color="error"
        />
        <span></span>
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
          color="error"
        />
      </div>
      <div className="spacer">
        <TextField
          className="rGap"
          id="outlined-basic"
          label="מייל"
          type={"email"}
          required
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={vaildationError.email}
          helperText={vaildationError.email}
          sx={{ marginLeft: 5 }}
          color="error"
        />
        <TextField
          id="outlined-basic"
          label="סיסמא"
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
          color="error"
        />
      </div>

      <button
        className="btn"
        variant="contained" onClick={submitHandler}>
        הרשמה
      </button>
      {success && (<Alert severity="success"
        >
          {success}
        </Alert>)
        }
      {error && (
        <Alert severity="error"
        // style={{ marginBottom: "10px" }}
        >
          {error}
        </Alert>
      )}
    </Box>

  </div>
);
};

export default SignUp;