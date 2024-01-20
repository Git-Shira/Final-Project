import React, { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Modal,
    Box,
} from "@mui/material";
import axios from "axios";

const TableOrder = ({ id }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(
                        `http://localhost:3000/cart/user/${id}/getOrder`
                    );
                    setUserData(response.data.cart);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    console.log(userData);
    return (
        <div>
            <h2>הזמנה</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>מספר הזמנה</TableCell>{" "}
                            {/* Replace with relevant user data */}
                            {/* Replace with relevant user data */}
                            <TableCell>מחיר כולל</TableCell>
                            <TableCell>פרטי הזמנה</TableCell>
                            <TableCell>אישור הזמנה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData && (
                            <TableRow>
                                <TableCell>{userData._id}</TableCell> {/* Display userId */}
                                {/* Display fullAddress */}
                                <TableCell>{userData.totalPrice}</TableCell>{" "}
                                {/* Display totalPrice */}
                                <TableCell>
                                    <Button onClick={handleOpenModal}>פרטי הזמנה</Button>
                                </TableCell>
                                <TableCell>מאושר</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
            <Modal open={openModal} onClose={handleCloseModal}>
                <div>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "white",
                            justifyContent: "center",
                            gap: "1rem",
                            width: "50%",
                            margin: "auto",
                        }}
                    >
                        <h2>פרטי הזמנה</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>שם מוצר</TableCell>
                                    <TableCell>מחיר</TableCell>
                                    <TableCell>כמות</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userData?.products.map((product) => (
                                    <TableRow>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </div>
            </Modal>
        </div>
    );
};

export default TableOrder;
