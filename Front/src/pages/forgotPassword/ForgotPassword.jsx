import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

import { Container, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const navigation = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [vaildationError, setVaildationError] = useState({});

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
        if (!date) {
            error.date = "שדה חובה";
        }
        setVaildationError(error);
        return Object.keys(error).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // debugger;
        if (Validate()) {

            const dataObj = new Date(date);
            // const year = dataObj.getFullYear();
            // const month = dataObj.getMonth() + 1;
            // const day = dataObj.getDate();
            // const newDate = `${year}-${month}-${day}`;
            const dateFormat = 'dd/MM/yyyy';
            const formattedDate = format(dataObj, dateFormat);
            const userData = {
                email: email,
                newPassword: password,
                // date: newDate,
                date: formattedDate,
            };
            try {
                const response = await axios.post(
                    "http://localhost:3000/auth/forgot_password",
                    userData
                );

                if (response.status === 200) {
                    setSuccess("הסיסמא שונתה בהצלחה");
                    // alert("הסיסמא שונתה בהצלחה");
                    setTimeout(() => {
                        navigation("/signIn");
                    }, 2000);
                }

            } catch (err) {
                if (err.response.status === 400) {
                    setError("המשתמש לא קיים במערכת");
                }
                if (err.response.status === 405) {
                    setError("האימות נכשל, התאריך לא תואם לתאריך השמור במערכת")
                }
                if (err.response.status === 500) {
                    setError("משהו השתבש, נסו שוב")
                }
                console.error(err);
            }
        }
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Container maxWidth="sm">
            <div className="forgot" style={{ minHeight: 610 }}>
                <div className="title-design">
                    <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                    <h1 data-aos="flip-down" data-aos-duration="1000">שכחתי סיסמא</h1>
                    <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
                </div>

                <div style={{ marginTop: "10px" }}>
                    {/* <form onSubmit={handleSubmit} style={{marginTop:"10px"}}> */}
                    <div className="spacer">
                        <TextField
                            label="כתובת דוא''ל"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            required
                            error={vaildationError.email}
                            helperText={vaildationError.email}
                            margin="normal"
                            color="error"
                        />
                    </div>
                    <div className="spacer">
                        <TextField
                            label="תאריך לידה"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            required
                            error={vaildationError.date}
                            helperText={vaildationError.date}
                            margin="normal"
                            color="error"
                        />
                    </div>
                    <div className="spacer">
                        <TextField
                            label="סיסמא חדשה"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            required
                            error={vaildationError.password}
                            helperText={vaildationError.password}
                            margin="normal"
                            color="error"
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
                        style={{ width: 200, fontSize: "x-large", marginTop: 40 }}
                    >
                        עדכון סיסמא
                    </button>
                    {/* </form> */}
                </div>
            </div>
            {success && (
            <Alert severity="success" style={{ margin: "0 auto", width: 500, justifyContent: "center" ,marginBottom:15,marginTop:-63}}
            >
                {success}
            </Alert>
            )}
            {error && (
                <Alert severity="error" style={{ margin: "0 auto", width: 500, justifyContent: "center"  ,marginBottom:15,marginTop:-65 }}
                >
                    {error}
                </Alert>
                 )}
        </Container>
    );
};

export default ForgotPassword;