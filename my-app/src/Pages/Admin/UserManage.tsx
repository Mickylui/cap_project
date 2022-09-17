import React, { useState } from "react";
import { Box, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import PostForm from "../Platform/PostForm";
import Products from "../Product/Products";
import { Link as RouteLink } from "react-router-dom";

export function AdminProfile() {
    const [link, switchLink] = useState("posts");
    return (
        <div>
            <UserImage />
            <Link
                as={RouteLink}
                to="posts"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Users
            </Link>
            <Link
                as={RouteLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Products
            </Link>
            <Link
                as={RouteLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Platforms
            </Link>
            <Link
                as={RouteLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Posts
            </Link>
            <Link
                as={RouteLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Banners
            </Link>
            <main>{link === "posts" ? <PostForm /> : <Products />}</main>
        </div>
    );
}

export default AdminProfile;