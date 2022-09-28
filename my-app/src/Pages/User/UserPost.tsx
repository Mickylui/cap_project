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
import { FcLikePlaceholder } from "react-icons/fc";
import "../css/socialPlatform.css";

const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
function UserPost(props) {
    // const dispatch: AppDispatch = useDispatch();
    // const postData = useSelector((state: RootState) => state.user.postData);
    // console.log("this is postData:", postData);
    const postData = props.postData;
    // if(postData)
    if (postData.length < 0) {
        return null;
    }
    return (
        // postList.is_ordinary === true -> admin post
        <div >
            <Flex style={{ justifyContent:'center',flexWrap:'wrap',width:"fit-content", margin:"2rem"}}>
                {postData.map((postItem) => (
                    <div key={`postItem_${postItem.id}`} className={"post-item"}>
                        <Box maxW="sm" borderRadius="lg" overflow="hidden">
                            <>
                                <RouteLink to={`/postDetail/${postItem.id}`}>
                                    {postItem.image[0] !== null ? (
                                        <Image
                                            src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                            alt={`image of postId:${postItem.id}`}
                                            maxHeight ='300px'
                                            // border="1px"
                                            // borderRadius="lg"
                                        />
                                    ) : (
                                        <Image
                                            src={"https://random.imagecdn.app/1000/1000"}
                                            alt={`image of postId:${postItem.id}`}
                                            maxHeight ='300px'
                                            // border="1px"
                                            // borderRadius="lg"
                                        />
                                    )}
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
                                justifyContent={'center'}
                            >
                                <RouteLink to={`/user/${postItem.user_id}`}>
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
                                    {postItem.is_liked_by_user.includes(true) ? (
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
            </Flex>
            <ScrollToTopButton />
        </div>
    );
}

export default UserPost;
function setSearchTag(innerHTML: any) {
    throw new Error("Function not implemented.");
}
