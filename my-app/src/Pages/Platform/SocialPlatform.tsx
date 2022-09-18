import { Button, Center, HStack, Input } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import React, { useEffect } from "react";
// import PostForm from "./PostForm";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { getPostFetch } from "../../Api/PlatformFetch";
import { AppDispatch, RootState, store } from "../../Redux/store";
import { useSelector } from "react-redux";

function SocialPlatform() {
    const dispatch: AppDispatch = useDispatch();
    const postList = useSelector((state: RootState) => state.platform.list);
    console.log("postList:",postList)

    async function getPost() {
        const getPostResponse = await dispatch(getPostFetch());
        console.log("this is getPostResponse:", getPostResponse);
        return;
    }
    useEffect(() => {
        // console.log("state:", store.getState());
        getPost();
    }, []);

    return (
        // postList.is_ordinary === true -> admin post
        <div>
            <Input
                size="lg"
                htmlSize={70}
                width="auto"
                m="4rem 2rem 1rem"
                placeholder="Search keywords or tags"
                type="text"
                value=""
                onChange={(e) => e.target.value}
            />
            <Button colorScheme="teal" size="md">
                Search
            </Button>
            <RouteLink to="platform/form">
                <Button size="md">
                    <FaPlusCircle />
                </Button>
            </RouteLink>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                {postList.map((postItem) => (
                    <div key={`postItem_${postItem.id}`}>
                        <Box maxW="sm" borderRadius="lg" overflow="hidden">
                            {/* <RouteLink to="postDetail">
                                <Image
                                    src={postItem.imageUrl}
                                    alt={postItem.imageAlt}
                                    border="1px"
                                    borderRadius="lg"
                                />
                            </RouteLink> */}
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
                                {postItem.contact}
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

export default SocialPlatform;
