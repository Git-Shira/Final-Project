import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

import AOS from 'aos';

import "./ViewUsers.css";
import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

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
            <Container>
                <div className="title-design">
                    <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                    <h1 data-aos="flip-down" data-aos-duration="1000">מאגר לקוחות</h1>
                    <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
                </div>

                <Table className="table table-bordered" style={{ width: 500 }} >
                    <TableHead>
                    <TableRow style={{ borderColor:"#C1121F", color:"C1121F"}}>
                            <TableCell style={{ textAlign: "center" }}> שם משתמש</TableCell>
                            <TableCell style={{ textAlign: "center" }}> תאריך לידה</TableCell>
                            <TableCell style={{ textAlign: "center" }}>כתובת דוא''ל</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers ? (
                            allUsers.map((user) => (
                                <TableRow style={{ borderColor:"#C1121F" , textAlign: "center" }}>
                                    <TableCell style={{ width: 200, textAlign: "center" }}>{user.fullName}</TableCell> {/* Display userId */}
                                    <TableCell style={{ width: 300, textAlign: "center" }}>{user.date}</TableCell> {/* Display User email */}
                                    <TableCell style={{ width: 300, textAlign: "center" }}>{user.email}</TableCell> {/* Display User email */}
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
