import React, { useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { LogIn, SignUp } from "./Pages/Utils/Account";
import { ProductDetail } from "./Pages/Product/ProductDetail";
import { Products } from "./Pages/Product/Products";
import LandingPage from "./Pages/LandingPage";
import SocialPlatform from "./Pages/Platform/SocialPlatform";
import Profile from "./Pages/User/Profile";
import AdminProfile from "./Pages/Admin/AdminProfile";

const DEVELOP_HOST = "http://localhost:8080";
function App() {
    useEffect(() => {
        GetUserDataJWT()
    }, []);
    async function GetUserDataJWT() {
        const token = JSON.stringify(window.localStorage.getItem("token"));
        console.log("GetUserDataJWT:",token)
        if(token){
            const resp = await fetch(`${DEVELOP_HOST}/account/userDataJWT`, {
                method: "GET",
                headers:{
                    'Auth': `bear ${token}`
                }
            });
            const result = await resp.json();
            return result;
        }
        window.location.href = "/login"
        return
    }
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="logIn" element={<LogIn />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="user" element={<Profile />} />
                    <Route path="admin" element={<AdminProfile />} />
                    <Route path="products" element={<Products />} />
                    <Route path="productDetail" element={<ProductDetail />} />
                    <Route path="posts" element={<SocialPlatform />} />
                    {/* <Route path={routes.postItem({item_id:':item_id'})} element={ <PostDetail /> }/> */}
                    <Route path="*" element={<>404 : Page Not Found</>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
