import logo from "./logo.svg";
import "./App.css";
import Home from "../src/pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import AdminRoute from "./components/Route/AdminRoute";
import UserRoute from "./components/Route/UserRoute";
import Management from "./pages/admin/Management";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import Pay from "./pages/cart/Pay";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartPersistenceMiddleware } from "./redux/cartSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartPersistenceMiddleware());
  }, [dispatch]);
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Admin/*" element={<Management />} />
        <Route path="/User/*" element={<UserRoute />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Pay" element={<Pay />} />
      </Routes>
    </Router>
  );
}

export default App;
