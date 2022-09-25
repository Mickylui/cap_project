import { Button, Center, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import PostForm from "./PostForm";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "../../Redux/store";
import { useSelector } from "react-redux";
import { FcLikePlaceholder } from "react-icons/fc";
import { getUserPostFetch } from "../../Api/userFetch";
import "../css/socialPlatform.css";

function PostMange() {
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    const postData = useSelector((state: RootState) => state.user.postData);

    const userId = combineUserData[0].id;
    // console.log("userId:", userId);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const getUserPost = async () => {
            // console.log("getting post !");
            await dispatch(getUserPostFetch(userId));
        };
        getUserPost();
    }, []);
    // const dispatch: AppDispatch = useDispatch();
    // const postData = useSelector((state: RootState) => state.user.postData);
    // console.log("this is postData:", postData);
    // if(postData)
    console.log("UserPost:", postData);
    if (postData.length < 0) {
        return null;
    }
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    return (
        // postList.is_ordinary === true -> admin post
        <div>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                {postData.map((postItem) => (
                    <div key={`postItem_${postItem.id}`} className={"post-item"}>
                        <Box maxW="sm" borderRadius="lg" overflow="hidden">
                            {postItem.image[0] !== null ? (
                                <>
                                    <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                        <Image
                                            src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                            alt={`image of postId:${postItem.id}`}
                                            // border="1px"
                                            // borderRadius="lg"
                                        />
                                    </RouteLink>
                                    <Box p="6">
                                        <Box
                                            // mt="1"
                                            className="title"
                                            fontWeight="semibold"
                                            fontSize={"2em"}
                                            as="h4"
                                            lineHeight="tight"
                                            // noOfLines={1}
                                            backgroundColor={"white"}
                                        >
                                            {postItem.title}
                                        </Box>
                                    </Box>
                                </>
                            ) : (
                                <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                    <Box p="6">
                                        <Box
                                            // mt="1"
                                            className="title"
                                            fontWeight="semibold"
                                            fontSize={"2em"}
                                            as="h4"
                                            lineHeight="tight"
                                            // noOfLines={1}
                                            backgroundColor={"white"}
                                        >
                                            {postItem.title}
                                        </Box>
                                    </Box>
                                </RouteLink>
                            )}
                            <Box>
                                {postItem.tag.map((item) => (
                                    <Tag
                                        onClick={(e) => {
                                            setSearchTag(e.target.innerHTML);
                                        }}
                                        className="tags"
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </Box>
                            <Tag
                                size="lg"
                                colorScheme="none"
                                borderRadius="full"
                                className="user-profile"
                            >
                                <RouteLink to={`/user/${postItem.user_id}`} replace={true}>
                                    <Avatar
                                        src={`${DEVELOP_IMAGE_URL}/users/${postItem.icon}`}
                                        size="md"
                                        name={`${postItem.account_name}`}
                                        ml={-1}
                                        mr={2}
                                    />
                                </RouteLink>
                                <h1 className="user-name">{postItem.account_name}</h1>
                                <div className="like-button">
                                    {postItem.is_dislike[0] === false &&
                                    postItem.is_liked_by_user[0] === true ? (
                                        <FaHeart color="red" />
                                    ) : (
                                        <FcLikePlaceholder />
                                    )}
                                    {postItem.count}
                                </div>
                                <RouteLink to="reportPost">
                                    <Button className="user-profile-button">
                                        <WarningTwoIcon />
                                    </Button>
                                </RouteLink>
                            </Tag>
                        </Box>
                    </div>
                ))}
            </SimpleGrid>
            <ScrollToTopButton />
        </div>
    );
}

export default PostMange;
