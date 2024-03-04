import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddSingleProjact from "./add/AddSingleProjact";
import { TextField, Box } from "@mui/material";
import Edit from "./edit/Edit";
import axios from "axios";
import ProductsCard from "../../components/card/products/ProductsCard";

import "./Management.css";
import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

const Management = () => {
  const [open, setOpen] = React.useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // State to store the ID of the product to be edited

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/all");
      setAllProducts(response?.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="management">

      <Container>

        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">ניהול מוצרים</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleClickOpen}>
            Add
          </Button>
        </Stack>
        <Container>
          {allProducts ? (
            allProducts?.map((product, index) => {
              return (
                <>
                  <ProductsCard key={product._id} product={product} fetchProducts={fetchProducts} />
                </>
              );
            })
          ) : (
            <p>No products available</p>
          )}
        </Container>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <AddSingleProjact setOpen={setOpen} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>

      </Container>
    </div>
  );
};

export default Management;
