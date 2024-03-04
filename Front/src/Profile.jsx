import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Container } from "@mui/system";
import TableOrder from "./TableOrder";
const Profile = ({ id }) => {
    console.log("id", id);
    const [user, setUser] = useState("");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user?.user);
    }, []);
    console.log("id", user);
    return (
        <Container maxWidth="sm">
            <h1> פרטים</h1>
            <h3>שם מלא: {id?.fullName}</h3>
            <h3>מייל: {id?.email}</h3>

            <TableOrder id={id} />
        </Container>
    );
};

export default Profile;
