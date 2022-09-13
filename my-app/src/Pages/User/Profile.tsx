import React, { useState } from "react";
import { Box, Link } from "@chakra-ui/react";
import UserImage from "./UserImage";
import { Link as ReachLink } from "@reach/router";
import PostForm from "../Platform/PostForm";
import Products from "../Product/Products";
import UsePoints from "./UsePoints";
import GetPoints from "./GetPoints";

function Profile() {
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
                Post
            </Link>
            <Link
                as={ReachLink}
                to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Like
            </Link>
            <main>{link === "posts" ? <PostForm /> : <Products />}</main>
            <UsePoints />
            <GetPoints />
        </div>
    );
}

export default Profile;
// default -> post component

// click like -> like component
