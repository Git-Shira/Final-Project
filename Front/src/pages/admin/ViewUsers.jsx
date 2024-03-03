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
                <h1>Users</h1>
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
