import UserImage from "../../Components/UserImage";
import { Box, Button, Link } from "@chakra-ui/react";
import { ShippingManage } from "./ShippingManage";
import ProductManage from "./ProductManage";
import { useEffect, useState } from "react";
import SocialPlatform from "../Platform/SocialPlatform";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostFetch } from "../../Api/userFetch";
import PostManage from "./PostManage";
import "../css/adminSystem.css";

export function AdminSystem() {
    const [adminLink, switchAdminLink] = useState("products");
    return (
        <>
            <div className="admin-profile-container">
                <UserImage />

                <Box
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("products")}
                >
                    Products
                </Box>
                <Box

                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("shipping")}
                >
                    Shipping
                </Box>

                <Box

                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("posts")}
                >
                    Posts
                </Box>
    
            </div>
            <main>
                {adminLink === "products" ? <ProductManage /> : <></>}
                {adminLink === "shipping" ? <ShippingManage /> : <></>}
                {adminLink === "posts" ? <PostManage /> : <></>}
            </main>
        </>
    );
}
