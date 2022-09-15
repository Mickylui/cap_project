import React, { useState } from "react";
import { Box, Button, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import { Link as ReachLink } from "@reach/router";
import PostForm from "../Platform/PostForm";
import Products from "../Product/Products";
import UsePoints from "./UsePoints";
import GetPoints from "./GetPoints";
import {WarningTwoIcon} from "@chakra-ui/icons"
import { Link as RouteLink, Outlet } from "react-router-dom";

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
            <RouteLink to='report'>
                <Button>
                    <WarningTwoIcon />
                </Button>
            </RouteLink>
            
            <main>{link === "posts" ? <PostForm /> : <Products />}</main>
            <UsePoints />
            <GetPoints />
            {/* <Outlet/> */}
        </div>
    );
}

export default Profile;
// default -> post component

// click like -> like component
