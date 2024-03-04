import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddSingleProduct from "./add/AddSingleProduct";
import { TextField, Box } from "@mui/material";
import Edit from "./edit/Edit";
import axios from "axios";
import ProductsCard from "../../../components/card/products/ProductsCard";

import "./Management.css";
import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

const Management = () => {
  const [open, setOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // State to store the ID of the product to be edited

  const [search, setSearch] = React.useState("");

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

        <button className="btn"
          style={{ marginBottom: 15 }}
          onClick={handleClickOpen}>הוספת מוצר חדש</button>
        <br />

        <strong
          style={{
            marginLeft: 5
          }}
        >חיפוש מנה: &nbsp;</strong>
        <TextField
          style={{ marginBottom: 15 }}
          id="outlined-basic"
          className="search"
          label="Search"
          type={"text"}
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          defaultValue={search}
          autoComplete="off"
        />

        {search && (<button className="btn"
          style={{ marginRight: 100 }}
          onClick={() => {
            setSearch("");
          }}>נקה סינון</button>)}

        <div className="dishes">
          <div className="box-container">
            {allProducts ? (
              allProducts?.filter(
                (product) =>
                  product.name.toLowerCase().startsWith(search.toLowerCase())
              )

                .map((product, index) => {
                  return (
                    <>
                      <ProductsCard key={product._id} product={product} fetchProducts={fetchProducts} />
                    </>
                  );
                })
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <AddSingleProduct setOpen={setOpen} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Container>

    </div>
  );
};

export default Management;
