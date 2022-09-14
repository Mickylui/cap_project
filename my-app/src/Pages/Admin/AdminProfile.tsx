import React, { useState } from "react";
import { Box, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import PostForm from "../Platform/PostForm";
import Products from "../Product/Products";

function AdminProfile() {
    const [link, switchLink] = useState("posts");
    return (
        <div>
            <UserImage />
            <Link
                as={ReachLink}
                to="posts"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Users
            </Link>
            <Link
                as={ReachLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Products
            </Link>
            <Link
                as={ReachLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Platforms
            </Link>
            <Link
                as={ReachLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Posts
            </Link>
            <Link
                as={ReachLink}
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