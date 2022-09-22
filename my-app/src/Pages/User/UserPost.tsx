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

function UserPost(props) {
    // const dispatch: AppDispatch = useDispatch();
    // const postData = useSelector((state: RootState) => state.user.postData);
    // console.log("this is postData:", postData);
    const postData = props.postData;
    console.log("UserPost:", postData);

    return (
        // postList.is_ordinary === true -> admin post
        <div>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                {postData.map((postItem) => (
                    <div key={`postItem_${postItem.id}`}>
                        <Box maxW="sm" borderRadius="lg" overflow="hidden">
                            <RouteLink to={`postDetail?postId=${postItem.id}`}>
                                <Image
                                    src={"./skateBoardLogo.png"}
                                    alt={""}
                                    border="1px"
                                    borderRadius="lg"
                                />
                            </RouteLink>
                            <Box p="6">
                                <Box
                                    mt="1"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    noOfLines={1}
                                >
                                    {postItem.title}
                                </Box>

                                <Box>{postItem.description}</Box>
                            </Box>
                            <Tag size="lg" colorScheme="none" borderRadius="full">
                                <Avatar
                                    src="https://bit.ly/sage-adebayo"
                                    size="md"
                                    name="Segun Adebayo"
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{postItem.account_name}</TagLabel> <FaHeart color="red" />{" "}
                                {postItem.count}
                            </Tag>
                            <RouteLink to="reportPost">
                                <Button>
                                    <WarningTwoIcon />
                                </Button>
                            </RouteLink>
                        </Box>
                    </div>
                ))}
            </SimpleGrid>
            <ScrollToTopButton />
        </div>
    );
}

export default UserPost;
