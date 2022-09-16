import React, { useState } from "react";
import { Box, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import PostForm from "../Platform/PostForm";
import Products from "../Product/Products";
import { Link as RouteLink } from "react-router-dom";
import { ShippingManage } from "./ShippingManage";

export function AdminExceptUserManage(props) {
    console.log("props:", props);
    if (props.link === "products") {
        return <div>Products</div>;
    } else if (props.link === "shipping") {
        return <ShippingManage />;
    } else if (props.link === "platform") {
        return <div>Platform</div>;
    } else if (props.link === "posts") {
        return <div>Posts</div>;
    } else if (props.link === "banners") {
        return <div>Banners</div>;
    }
}

export default AdminExceptUserManage;
