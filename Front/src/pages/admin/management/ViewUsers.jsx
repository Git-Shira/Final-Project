import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container } from "@mui/system";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import AOS from 'aos';

import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

import "./ViewUsers.css";

const ViewUsers = () => {
    const [allUsers, setallUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/auth/all");
            setallUsers(response?.data.users);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        AOS.init();

        fetchUsers();
    }, []);

    return (
        <div>
            <div className="title-design">
                <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                <h1 data-aos="flip-down" data-aos-duration="1000">מאגר לקוחות</h1>
                <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
            </div>

            <Container>
                <Table className="table table-bordered" style={{ width: 500, marginTop: "10px" }} >
                    <TableHead>
                        <TableRow style={{ borderColor: "#C1121F" }}>
                            <TableCell style={{ textAlign: "center" }}> שם משתמש</TableCell>
                            {/* <TableCell style={{ textAlign: "center" }}> תאריך לידה</TableCell> */}
                            <TableCell style={{ textAlign: "center" }}> פלאפון</TableCell>
                            <TableCell style={{ textAlign: "center" }}>כתובת דוא''ל</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers ? (
                            allUsers.map((user) => (
                                <TableRow style={{ borderColor: "#C1121F", textAlign: "center" }}>
                                    <TableCell style={{ textAlign: "center" }}>{user.fullName}</TableCell> {/* Display userId */}
                                    {/* <TableCell style={{ textAlign: "center" }}>{user.date}</TableCell> Display User date */}
                                    <TableCell style={{ textAlign: "center" }}>0{user.phone}</TableCell> {/* Display User phone */}
                                    <TableCell style={{ textAlign: "center" }}>{user.email}</TableCell> {/* Display User email */}
                                </TableRow>
                            )))
                            :
                            (<h2>not found</h2>)}
                    </TableBody>
                </Table>
            </Container>
        </div>
    );
};

export default ViewUsers;