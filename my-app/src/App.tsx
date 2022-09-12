import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogIn, SignUp } from "./Pages/Utils/Account";
import { ProductDetail } from "./Pages/Product/ProductDetail";
import { Products } from "./Pages/Product/Products";
import LandingPage from "./Pages/LandingPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="logIn" element={<LogIn />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="products" element={<Products />} />
                    <Route path="productDetail" element={<ProductDetail />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
