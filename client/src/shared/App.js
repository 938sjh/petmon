import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import UploadProduct from "../pages/UploadProduct";
import DetailProduct from "../pages/DetailProduct";
import AllProduct from "../pages/AllProduct";
import { Routes,Route } from "react-router-dom";
import AuthCheck from "../auth";

function App() {
  return (
    <React.Fragment>
      <Header/>
        <Routes>
          <Route path="/" element={<AuthCheck component={Main}/>}/>
          <Route path="/login" element={<AuthCheck component={Login} option={false}/>}/>
          <Route path="/signup" element={<AuthCheck component={Signup} option={false}/>}/>
          <Route path="/cart" element={<AuthCheck component={Cart} option/>}/>
          <Route path="/product/upload" element={<AuthCheck component={UploadProduct} option/>}/>
          <Route path="/product/detail/:id" element={<AuthCheck component={DetailProduct}/>}/>
          <Route path="/product/all" element={<AuthCheck component={AllProduct}/>}/>
          <Route path="/product/popular" element={<AuthCheck component={DetailProduct}/>}/>
          <Route path="/product/new" element={<AuthCheck component={DetailProduct}/>}/>
          <Route path="/community" element={<AuthCheck component={DetailProduct}/>}/>
        </Routes>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
