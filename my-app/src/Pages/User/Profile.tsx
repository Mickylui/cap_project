import React, { useEffect, useState } from "react";
import { Box, Button, Link } from "@chakra-ui/react";
import UserImage from "../../Components/UserImage";
import { Link as ReachLink } from "@reach/router";
import Products from "../Product/Products";
import UsePoints from "./UsePoints";
import GetPoints from "./GetPoints";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Link as RouteLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import SocialPlatform from "../Platform/SocialPlatform";
import UserPost from "./UserPost";
import { getUserLikePostFetch, getUserPostFetch } from "../../Api/userFetch";
import UserLikePost from "./UserLikePost";
import { ShippingManage } from "../Admin/ShippingManage";
import { getOrderFetch } from "../../Api/adminFetch";
import ProductManage from "../Admin/ProductManage";

function Profile() {
    const [link, switchLink] = useState("posts");

    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    const likeData = useSelector((state: RootState) => state.user.likeData);
    const postData = useSelector((state: RootState) => state.user.postData);
    const location = useLocation();
    // console.log("this is postData:", postData);
    // console.log("Profile like data:", likeData);
    // console.log("combineUserData:", combineUserData);

    const userId = combineUserData[0].id;
    // console.log("userId:", userId);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const getUserPost = async () => {
            // console.log("getting post !");
            await dispatch(getUserPostFetch(userId));
        };
        getUserPost();
        const getUserLikePost = async () => {
            // console.log("getting post !");
            await dispatch(getUserLikePostFetch(userId));
        };
        getUserLikePost();
    }, [link]);
    return (
        <div>
            <UserImage />
            <Box
                // as={ReachLink}
                // to="posts"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("posts")}
            >
                Post
            </Box>
            <Box
                // as={ReachLink}
                // to="likes"
                margin="20px"
                fontSize="1.5rem"
                onClick={() => switchLink("products")}
            >
                Like
            </Box>
            <RouteLink to="report">
                <Button>
                    <WarningTwoIcon />
                </Button>
            </RouteLink>

            <main>
                {link === "posts" ? (
                    <UserPost postData={postData} />
                ) : (
                    <UserLikePost likeData={likeData} />
                )}
            </main>
            <UsePoints />
            <GetPoints />
            {/* <Outlet/> */}
        </div>
    );
}

export default Profile;
// default -> post component

// click like -> like component
