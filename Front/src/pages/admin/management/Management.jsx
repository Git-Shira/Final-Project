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

import ProductsCard from "../../../components/card/products/ProductsCard";
const Management = () => {
  const [open, setOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/all");
      setAllProducts(response?.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allProducts);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Container>
        <h1>Products</h1>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleClickOpen}>
            Add
          </Button>
        </Stack>
        <Container>
          {allProducts ? (
            allProducts?.map((product, index) => (
              <>
                <ProductsCard
                  key={product._id || index}
                  handleEditDialogOpen={handleEditDialogOpen}
                  product={product}
                />
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
                <Dialog
                  open={isEditDialogOpen}
                  onClose={handleEditDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <Edit product={product} />
                  </DialogContent>
                </Dialog>
              </>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Management;
