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
import SocialPlatform from "./Pages/Platform/SocialPlatform";
import Profile from "./Pages/User/Profile";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="logIn" element={<LogIn />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="users" element={<Profile />} />
                    <Route path="products" element={<Products />} />
                    <Route path="productDetail" element={<ProductDetail />} />
                    <Route path="posts" element={<SocialPlatform />} />
                    {/* <Route path={routes.postItem({item_id:':item_id'})} element={ <PostDetail /> }/> */}
                    <Route path="*" element={<>404 : Page Not Found</>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
