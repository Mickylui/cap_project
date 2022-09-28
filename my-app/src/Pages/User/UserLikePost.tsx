import { Button, Center, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, Flex, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import PostForm from "./PostForm";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "../../Redux/store";
import { useSelector } from "react-redux";
import { getUserLikePostFetch } from "../../Api/userFetch";
import "../css/socialPlatform.css";

function UserLikePost(props) {
    // const dispatch: AppDispatch = useDispatch();
    const likeData = props.likeData;
    console.log("this is likeData:", likeData);

    if (likeData.length < 0) {
        return null;
    }
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    return (
        // postList.is_ordinary === true -> admin post
        <div>
            <Flex style={{ display:"flex",flexWrap:"wrap" ,justifyItems:"center", width:"fit-content", margin:"2rem"}}>
                {likeData.map((postItem) => (
                    <div key={`postItem_${postItem.id}`} className={"post-item"}>
                        <Box maxW="sm" borderRadius="lg" overflow="hidden">
                            <>
                                <RouteLink to={`/postDetail/${postItem.id}`}>
                                    {postItem.image[0] !== null ? (
                                        <Image
                                            src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                            alt={`image of postId:${postItem.id}`}
                                            // border="1px"
                                            // borderRadius="lg"
                                        />
                                    ) : (
                                        <Image
                                            src={"https://random.imagecdn.app/1000/1000"}
                                            alt={`image of postId:${postItem.id}`}
                                            // border="1px"
                                            // borderRadius="lg"
                                        />
                                    )}
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
                                <RouteLink to={`/user/${postItem.user_id}`}>
                                    <Avatar
                                        src={`${DEVELOP_IMAGE_URL}/users/${postItem.icon[0]}`}
                                        size="md"
                                        name={`${postItem.account_name}`}
                                        ml={-1}
                                        mr={2}
                                    />
                                </RouteLink>
                                <h1 className="user-name">{postItem.account_name}</h1>
                                <div className="like-button">
                                    <FaHeart color="red" />
                                    {postItem.count}
                                </div>
                            </Tag>
                        </Box>
                    </div>
                ))}
            </Flex>
            <ScrollToTopButton />
        </div>
    );
}

export default UserLikePost;
