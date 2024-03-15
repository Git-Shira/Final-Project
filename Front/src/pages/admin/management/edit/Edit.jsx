import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import "./Edit.css";

const Edit = ({ product, handleEditSuccess }) => {
  console.log(product);
  const [editproduct, setEditProduct] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    image: product.image || "",
    category: product.category || "",
    amount: product.amount || "",
    filter: product.filter || "",
    show:product.show || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/products/update/${product?._id}`,
        editproduct
      );

      alert("המוצר עודכן בהצלחה");
      handleEditSuccess();
      console.log(response.data);

      // Clear the form after successful submission
      setEditProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        amount: "",
        filter: "",
        show:""
      });
    } catch (error) {
      console.log(error);
      // Handle error and display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit">
      <Box key={product._id} component="form">
        <TextField
          id="name"
          label="שם מלא"
          variant="outlined"
          fullWidth
          required
          value={editproduct.name}
          onChange={(e) =>
            setEditProduct({ ...editproduct, name: e.target.value })
          }
          color="error"
          />
        <TextField
          id="outlined-multiline-static"
          label="תיאור"
          multiline
          fullWidth
          rows={3}
          // defaultValue="Default Value"
          // required
          value={editproduct.description}
          onChange={(e) =>
            setEditProduct({ ...editproduct, description: e.target.value })
          }
          sx={{ marginTop: 2, marginBottom: 2 }}
          color="error"
          />
        <TextField
          id="image"
          label="קישור לתמונה"
          variant="outlined"
          fullWidth
          required
          value={editproduct.image}
          onChange={(e) =>
            setEditProduct({ ...editproduct, image: e.target.value })
          }
          sx={{ marginBottom: 2 }}
          color="error"
          />
        <TextField
          id="price"
          label="מחיר"
          type="number"
          variant="outlined"
          required
          value={editproduct.price}
          onChange={(e) =>
            setEditProduct({ ...editproduct, price: e.target.value })
          }
          sx={{ width: 80 }}
          color="error"
          />
          <FormControl  >
          <InputLabel id="show-label">מלאי</InputLabel>
          <Select
            labelId="show-label"
            id="show"
            label="מלאי"
            fullWidth
            required
            value={editproduct.show}
            defaultValue={"0"}
            onChange={(e) =>
              setEditProduct({ ...editproduct, show: e.target.value })
            }
            sx={{ marginRight: 1.2, width: 130 }}
            >
            <MenuItem value={"0"}>אזל במלאי</MenuItem>
            <MenuItem value={"1"}>קיים במלאי</MenuItem>
          </Select>
        </FormControl>
        <FormControl  >
          <InputLabel id="filter-label">פילטר</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            label="פילטר"
            fullWidth
            required
            value={editproduct.filter}
            defaultValue={"0"}
            onChange={(e) =>
              setEditProduct({ ...editproduct, filter: e.target.value })
            }
            sx={{ marginRight: 1.2, width: 200 }}
          >
            <MenuItem value={"0"}>ללא פילטר</MenuItem>
            <MenuItem value={"1"}>פופולארית</MenuItem>
            <MenuItem value={"12"}>פופולארית,חריפה</MenuItem>
            <MenuItem value={"13"}>פופולארית,טבעונית</MenuItem>
            <MenuItem value={"2"}>חריפה</MenuItem>
            <MenuItem value={"3"}>טבעונית</MenuItem>
            <MenuItem value={"23"}>חריפה,טבעונית</MenuItem>
            <MenuItem value={"123"}>פופולארית,חריפה,טבעונית</MenuItem>
          </Select>
        </FormControl>

        <FormControl required >
          <InputLabel id="category-label">קטגוריה</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="קטגוריה"
            fullWidth
            required
            value={editproduct.category}
            onChange={(e) =>
              setEditProduct({ ...editproduct, category: e.target.value })
            }
            sx={{ width: 110, marginRight: 1.2, marginBottom: 2 }}>
            <MenuItem value={"ראשונות"}>ראשונות</MenuItem>
            <MenuItem value={"מרקים"}>מרקים</MenuItem>
            <MenuItem value={"סושי ספיישל"}>סושי ספיישל</MenuItem>
            <MenuItem value={"ניגירי"}>ניגירי</MenuItem>
            <MenuItem value={"סשימי"}>סשימי</MenuItem>
            <MenuItem value={"קומבינציות"}>קומבינציות</MenuItem>
            <MenuItem value={"מגשי מסיבה"}>מגשי מסיבה</MenuItem>
            <MenuItem value={"באנים"}>באנים</MenuItem>
            <MenuItem value={"מוקפצים"}>מוקפצים</MenuItem>
            <MenuItem value={"עיקריות"}>עיקריות</MenuItem>
            <MenuItem value={"סלטים"}>סלטים</MenuItem>
            <MenuItem value={"תפריט טבעוני"}>תפריט טבעוני</MenuItem>
            <MenuItem value={"קינוחים"}>קינוחים</MenuItem>
            <MenuItem value={"משקאות"}>משקאות</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <button variant="contained" type="submit" className="btn"
        style={{ marginRight: 400 }}>
        שמירת שינויים
      </button>
    </form>
  );
};

export default Edit;
