import React, { useState } from "react";
import { Box, Button, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import { Link as ReachLink } from "@reach/router";
import Products from "../Product/Products";
import UsePoints from "./UsePoints";
import GetPoints from "./GetPoints";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Link as RouteLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import SocialPlatform from "../Platform/SocialPlatform";
import AdminExceptUserManage from "../Admin/AdminExceptUserManage";

function Profile() {
    const [link, switchLink] = useState("posts");
    const [adminLink, switchAdminLink] = useState("users");
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);

    if (isAdmin) {
        return (
            <div>
                <UserImage />
                <Link
                    // as={ReachLink}
                    // to="posts"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("users")}
                >
                    Users
                </Link>
                <Link
                    // as={ReachLink}
                    // to="likes"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("products")}
                >
                    Products
                </Link>
                <Link
                    // as={ReachLink}
                    // to="likes"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("shipping")}
                >
                    Shipping
                </Link>
                <Link
                    // as={ReachLink}
                    // to="likes"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("platform")}
                >
                    Platform
                </Link>
                <Link
                    // as={ReachLink}
                    // to="likes"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("posts")}
                >
                    Posts
                </Link>
                <Link
                    // as={ReachLink}
                    // to="likes"
                    margin="20px"
                    fontSize="1.5rem"
                    onClick={() => switchAdminLink("banners")}
                >
                    Banners
                </Link>
                <main>{adminLink === "users" ? <SocialPlatform /> : <AdminExceptUserManage link={`${adminLink}`}/>}</main>
            </div>
        );
    }
    return (
        <div>
            <UserImage />
            <Link
                // as={ReachLink}
                // to="posts"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Post
            </Link>
            <Link
                // as={ReachLink}
                // to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Like
            </Link>
            <RouteLink to="report">
                <Button>
                    <WarningTwoIcon />
                </Button>
            </RouteLink>
            
            <main>{link === "posts" ? <SocialPlatform /> : <Products />}</main>
            <UsePoints />
            <GetPoints />
            {/* <Outlet/> */}
        </div>
    );
}

export default Profile;
// default -> post component

// click like -> like component
