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

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> שם משתמש</TableCell>{" "}
                            {/* Replace with relevant user data */}
                            {/* Replace with relevant user data */}
                            <TableCell>כתובת אימייל</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers ? (
                            allUsers.map((user) => (
                                <TableRow>
                                    <TableCell>{user.fullName}</TableCell> {/* Display userId */}
                                    {/* Display fullAddress */}
                                    <TableCell>{user.email}</TableCell>{" "}
                                    {/* Display totalPrice */}
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
