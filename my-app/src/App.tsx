import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Redux/store";
import "./App.css";

import { LogIn, SignUp } from "./Pages/Account";
// import { ProductDetail } from "./Pages/Product/ProductDetail";
import { Products } from "./Pages/Product/Products";
import LandingPage from "./Pages/LandingPage";
import SocialPlatform from "./Pages/Platform/SocialPlatform";
import Profile from "./Pages/User/Profile";
import AdminProfile from "./Pages/Admin/UserManage";
import CompleteForm from "./Pages/User/CompleteForm";
import ReportUser from "./Pages/User/ReportUser";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Slideshow } from "./Components/AutoSlider";
import Table from "./Components/Table";
import PrivateRoute from "./Components/PrivateRoute";

import { getUserDataJWTFetch } from "./Api/accountFetch";
import NotFound from "./Pages/NotFound";
import { ImageUpload } from "./Components/ImageUpload";
import DeliveryAddress from "./Pages/User/DeliveryAddress";
import ShoppingCart from "./Pages/User/ShoppingCart";
import PayWithPoints from "./Pages/User/PayWithPoints";
import PostForm from "./Pages/Platform/PostForm";
import { InsertTags } from "./Pages/Platform/InputTags";
import ReportPost from "./Pages/Platform/ReportPost";
import PostDetail from "./Pages/Platform/PostDetail";
import Settings from "./Pages/User/Settings";
import Payment from "./Pages/User/Payment";
import Promotion from "./Pages/User/Promotion";
import ProductDetail from "./Pages/Product/ProductDetail";

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
    const shoppingData = useSelector((state: RootState) => state.account.shoppingData);
    console.log("shoppingData:", shoppingData);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const GetUserDataJWT = async () => {
            const token = window.localStorage.getItem("token");
            if (!isLoggedIn && token) {
                await dispatch(getUserDataJWTFetch({ token }));
                console.log("isLoggedIn:", isLoggedIn);
            }
        };

        GetUserDataJWT();
    }, []);

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route index element={<LandingPage />} />
                    <Route path="logIn" element={<LogIn />} />
                    <Route path="signUp" element={<SignUp />} />
                    <Route path="user" element={<PrivateRoute />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="profile/form" element={<CompleteForm />} />
                        <Route path="profile/report" element={<ReportUser />} />
                    </Route>
                    <Route path="admin" element={<PrivateRoute />}>
                        <Route path="manage" element={<Profile />} />Í
                    </Route>
                    <Route path="posts/platform" element={<PrivateRoute />}>
                        <Route path="form" element={<PostForm />} />Í
                    </Route>
                    <Route path="products" element={<Products />} />
                    <Route path="products/productDetail/:productId" element={<ProductDetail />} />
                    <Route path="cart" element={<PrivateRoute />}>
                        <Route path="data" element={<ShoppingCart />} />
                        <Route path="payment" element={<Payment />} />
                        <Route path="payment/promotion" element={<Promotion />} />
                        <Route path="contact" element={<DeliveryAddress />} />
                    </Route>

                    <Route path="setting" element={<PrivateRoute />}>
                        <Route path="user" element={<Settings />} />
                    </Route>

                    {/* <Route path="cart/contact/usePoints" element={<PayWithPoints />} /> */}
                    <Route path="posts" element={<SocialPlatform />} />
                    <Route path="posts/postDetail/:postId" element={<PostDetail />} />
                    {/* <Route path="postDetail/:postId" element={<PostDetail />} /> */}

                    <Route path="posts" element={<PrivateRoute />}>
                        <Route path="reportPost" element={<ReportPost />} />
                    </Route>

                    {/* temp route */}
                    <Route path="slider" element={<Slideshow />} />
                    <Route path="table" element={<Table />} />
                    <Route path="upload" element={<ImageUpload />} />
                    <Route path="tags" element={<InsertTags />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
