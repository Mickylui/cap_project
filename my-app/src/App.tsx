import React, { useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { LogIn, SignUp } from "./Pages/Account";
import { ProductDetail } from "./Pages/Product/ProductDetail";
import { Products } from "./Pages/Product/Products";
import LandingPage from "./Pages/LandingPage";
import SocialPlatform from "./Pages/Platform/SocialPlatform";
import Profile from "./Pages/User/Profile";
import AdminProfile from "./Pages/Admin/AdminProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Redux/store";
import { getUserDataJWTFetch } from "./Api/AccountFetch";
import { Slideshow } from "./Components/AutoSlider";

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
    const dispatch: AppDispatch = useDispatch();
    // if has JWT -> backend check if valid -> status: login -> true, isAdmin change
    useEffect(() => {
        GetUserDataJWT();
    });
    const GetUserDataJWT = async () => {
        const token = window.localStorage.getItem("token");
        if (!isLoggedIn && token) {
            // console.log("GetUserDataJWT:", token);
            const userDataJWT = await dispatch(getUserDataJWTFetch({ token }));
            console.log("userDataJWT:", userDataJWT);
        }
        // navigate("/")
    };
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="logIn" element={<LogIn />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="users" element={<Profile />} />
                    <Route path="users/form" element={<CompleteForm />} />
                    <Route path="users/report" element={<ReportUser />} />
                    <Route path="products" element={<Products />} />
                    <Route path="productDetail" element={<ProductDetail />} />
                    <Route path="posts" element={<SocialPlatform />} />
                    <Route path="slider" element={<Slideshow />} />
                    {/* <Route path={routes.postItem({item_id:':item_id'})} element={ <PostDetail /> }/> */}
                    <Route path="*" element={<>404 : Page Not Found</>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
