import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "@mui/material/Alert";
import { Container, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userDe, setUserDe] = useState({});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vaildationError, setVaildationError] = useState({});

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const Validate = () => {
    const error = {};
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
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Validate()) {
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
        if (response.status === 200) {
          if (user.permission === "admin") {
            setSuccess("התחברת בהצלחה");
            // alert("התחברת בהצלחה");
            setTimeout(() => {
              // navigation("/Admin/Management");
              navigation("/Menu");

            }, 2000);
          } else {
            setSuccess("התחברת בהצלחה");
            // alert("התחברת בהצלחה");
            setTimeout(() => {
              navigation("/Menu");
            }, 2000);
          }
        }
      }
      catch (error) {
        if (error.response.status === 400) {
          setError("המשתמש לא קיים במערכת");
        }
        if (error.response.status === 405) {
          setError("סיסמא שגויה")
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
  }, [])

  return (
    <Container maxWidth="sm">
      <div className="hithabrut" style={{ minHeight: 610 }} >
        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">התחברות</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>

        <div style={{ marginTop: "10px" }} >
          {/* <form onSubmit={handleSubmit} style={{marginTop:"10px"}} > */}
          <div className="spacer">
            <TextField
              className="rGap"
              label="כתובת דוא''ל"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-aos="fade-right"
              data-aos-duration="1000"
              required
              autoComplete="off"
              error={vaildationError.email}
              helperText={vaildationError.email}
              margin="normal"
              color="error"
            />
          </div>
          <div className="spacer">
            <TextField
              className="right"
              id="password"
              label="סיסמא"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-aos="fade-left"
              data-aos-duration="1000"
              required
              autoComplete="off"
              error={vaildationError.password}
              helperText={vaildationError.password}
              color="error"
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
            />
          </div>
          <button
            className="btn btn-shadow"
            // type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{
              marginBottom: 25, marginTop: 15, width: 150, fontSize: "x-large"
            }}
          >
            כניסה
          </button>
          {/* </form> */}
        </div>

        <Typography
          className="typo"
          variant="body1"
          align="center" color="white"
        >
          עדיין לא רשומים?
          <Link to={"/SignUp"} style={{ marginRight: 20 }}>הרשמה </Link>
        </Typography>
        <Typography
          variant="body1" align="center" fontSize={18}>
          <Link to={"/ForgotPassword"}>שכחתי סיסמא </Link>
        </Typography>

        {success && (
          <Alert severity="success" style={{ margin: "0 auto", width: 500, justifyContent: "center", marginTop: 15 }}
          >
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" style={{ margin: "0 auto", width: 500, justifyContent: "center", marginTop: 15 }}
          >
            {error}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default SignIn;