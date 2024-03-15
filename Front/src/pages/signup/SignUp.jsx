import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vaildationError, setVaildationError] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const Validate = () => {
    const error = {};
    if (!fullName) {
      error.fullName = "שדה חובה";
    } else if (!/^[א-תa-zA-Z]+( [א-תa-zA-Z]+)*$/.test(fullName)) {
      error.fullName = "אנא הכנס שם מלא תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (!email) {
      error.email = "שדה חובה";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "כתובת הדוא''ל אינה תקינה";
    }
    if (!password) {
      error.password = "שדה חובה";
    } else if (password.length < 6) {
      error.password = "הסיסמא חייבת להיות באורך של 6 תווים לפחות";
    }
    // if (!date) {
    //   error.date = "שדה חובה";
    // }
    if (!phone) {
      error.phone = "שדה חובה";
    }
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Validate()) {
      // const dataObj = new Date(date);
      // const year = dataObj.getFullYear();
      // const month = dataObj.getMonth() + 1;
      // const day = dataObj.getDate();
      // const newDate = `${year}-${month}-${day}`;
      // const dateFormat = 'dd/MM/yyyy';
      // const formattedDate = format(dataObj, dateFormat);
      const userData = {
        fullName: fullName,
        email: email,
        password: password,
        // date: newDate,
        // date: formattedDate
        phone:phone
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
          setError("כתובת הדוא''ל כבר קיימת במערכת");
        }
        if (error.response.status === 500) {
          setError("משהו השתבש, נסו שוב")
        }
        console.error(error);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="harshama" style={{ minHeight: 610 }}>

      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">הרשמה לאתר</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>
      <Box
        component="form"
        sx={{
          marginTop: "10px"
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          className="rGap"
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          data-aos="fade-right"
          data-aos-duration="1000"
          required
          error={vaildationError.fullName}
          helperText={vaildationError.fullName}
          onChange={(e) => setFullName(e.target.value)}
          color="error"
        />

        <br />

        {/* <TextField
          id="outlined-basic"
          type="date"
          label="תאריך לידה"
          variant="outlined"
          data-aos="fade-left"
          data-aos-duration="1000"
          required
          onChange={(e) => setDate(e.target.value)}
          helperText={vaildationError.date}
          error={vaildationError.date}
          // inputProps={{
          //   pattern: "\\d{4}-\\d{2}-\\d{2}",
          //   title: "Please use the yyyy-mm-dd format",
          // }}
          color="error"
        /> */}
 <TextField
          id="outlined-basic"
          type="number"
          label="פלאפון"
          variant="outlined"
          data-aos="fade-left"
          data-aos-duration="1000"
          required
          onChange={(e) => setPhone(e.target.value)}
          helperText={vaildationError.phone}
          error={vaildationError.phone}
          // inputProps={{
          //   pattern: "\\d{4}-\\d{2}-\\d{2}",
          //   title: "Please use the yyyy-mm-dd format",
          // }}
          color="error"
        />
        <br />

        <TextField
          className="rGap"
          id="outlined-basic"
          label="כתובת דוא''ל"
          type={"email"}
          data-aos="fade-right"
          data-aos-duration="1000"
          required
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={vaildationError.email}
          helperText={vaildationError.email}
          color="error"
        />
        <br />
        <TextField
          id="outlined-basic"
          label="סיסמא"
          type={showPassword ? "text" : "password"} // Toggle password visibility
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-aos="fade-left"
          data-aos-duration="1000"
          required
          error={vaildationError.password}
          helperText={vaildationError.password}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ left: 55 }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          color="error"
        />

        <br />

        <button
          className="btn btn-shadow"
          variant="contained" onClick={submitHandler}
          style={{ width: 150, fontSize: "x-large", marginTop: -15 }}>
          הרשמה
        </button>

        {success && (
          <Alert severity="success" style={{ margin: "0 auto", width: 500, justifyContent: "center" }}
          >
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" style={{ margin: "0 auto", width: 500, justifyContent: "center" }} >
            {error}
          </Alert>
        )}
      </Box>

    </div>
  );
};

export default SignUp;