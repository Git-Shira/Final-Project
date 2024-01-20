import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Container } from "@mui/system";
import TableOrder from "./Tableorder";
const Profile = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user?.user);
    }, []);
    console.log("id", user);
    return (
        <Container maxWidth="sm">
            <h1> פרטים</h1>
            <h3>שם מלא: {user?.fullName}</h3>
            <h3>מייל: {user?.email}</h3>

            <TableOrder id={user._id} />
        </Container>
    );
};

export default Profile;
