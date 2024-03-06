import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import { login } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDe, setUserDe] = useState({});

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
      error.email = "המייל אינו תקין";
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
              navigation("/Admin/Management");
            }, 2000);
          } else {
            setSuccess("התחברת בהצלחה");
            // alert("התחברת בהצלחה");
            setTimeout(() => {
              navigation("/");
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
      <div className="hithabrut" style={{ height: 700 }} >
        {/* <Typography className="hithabrut" variant="h4" component="h2" align="center">
          התחברות
        </Typography> */}

        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">התחברות</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="spacer">
            <TextField
              className="rGap"
              label="מייל"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
              error={vaildationError.password}
              helperText={vaildationError.password}
              color="error"
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
          </div>
          <button
            className="btn"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: "10px" }}
          >
            כניסה
          </button>
        </form>

        <Typography
          className="typo"
          variant="body1"
          align="center">
          עדיין לא רשומים? <Link to={"/SignUp"}>הרשמה </Link>
        </Typography>
        <Typography
          variant="body1" align="center" fontSize={18}>
          <Link to={"/ForgotPassword"}>שכחתי סיסמא </Link>
        </Typography>

        {success && (<Alert severity="success"
        >
          {success}
        </Alert>)
        }
        {error && (
          <Alert severity="error"
          >
            {error}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default SignIn;