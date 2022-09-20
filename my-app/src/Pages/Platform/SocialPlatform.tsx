import { Button, Center, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
// import PostForm from "./PostForm";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { getPostFetch, getSearchTagPostFetch } from "../../Api/platformFetch";
import { AppDispatch, RootState, store } from "../../Redux/store";
import { useSelector } from "react-redux";
import { PostState } from "../../Redux/Slice/platformSlice";

const suggestedTags = [{ tag: "a" }, { tag: "b" }];

function SocialPlatform() {
    const dispatch: AppDispatch = useDispatch();
    const postList = useSelector((state: RootState) => state.platform.list);
    const [searchTag, setSearchTag] = useState("");
    const [searchContent, setSearchContent] = useState("");
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    console.log("postList:", postList);
    console.log("searchTag:", searchTag);

    // Search Content: form submit -> fetch this content and replace state.platform.list;
    // need Infinite scroll!!
    async function handleSearch(e) {
        const form = e.target;
        console.log("this is form:", form);
        return;
    }
    const adminPostList = useMemo(
        () => postList.filter((postItem) => postItem.is_ordinary === true),
        [postList]
    );
    const userPostList = useMemo(
        () => postList.filter((postItem) => postItem.is_ordinary === false),
        [postList]
    );
    // console.log("adminPostList:", adminPostList);
    // console.log("userPostList:", userPostList);

    useEffect(() => {
        // console.log("state:", store.getState());
        const getPost = async () => {
            await dispatch(getPostFetch());
        };
        getPost();
    }, []);

    useEffect(() => {
        const fetchSearchTag = async () => {
            await dispatch(getSearchTagPostFetch(searchTag));
        };

        if (searchTag !== "") {
            fetchSearchTag();
        }
    }, [searchTag]);

    return (
        // postList.is_ordinary === true -> admin post
        <div>
            {searchTag.length > 0 ? (
                <HStack spacing={4}>
                    <Tag borderRadius="full" variant="solid" colorScheme="green">
                        <TagLabel>{searchTag}</TagLabel>
                        <TagCloseButton onClick={() => setSearchTag("")} />
                    </Tag>
                </HStack>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        console.log("form:", form.searchContent.value);
                    }}
                >
                    <Input
                        size="lg"
                        htmlSize={70}
                        width="auto"
                        m="4rem 2rem 1rem"
                        placeholder="Search keywords or tags"
                        type="text"
                        name="searchContent"
                    />
                    <Button colorScheme="teal" size="md" type="submit">
                        Search
                    </Button>
                </form>
            )}

            <RouteLink to="platform/form">
                <Button size="md">
                    <FaPlusCircle />
                </Button>
            </RouteLink>
            <HStack spacing={4}>
                {suggestedTags.map((suggestedTag, index) => (
                    <Tag
                        key={suggestedTag.id}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                    >
                        <TagLabel onClick={() => setSearchTag(suggestedTag.tag)}>
                            {suggestedTag.tag}
                        </TagLabel>
                    </Tag>
                ))}
            </HStack>
            {adminPostList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {adminPostList.map((postItem) => (
                        <div key={`postItem_${postItem.id}`}>
                            <Box maxW="sm" borderRadius="lg" overflow="hidden">
                                <RouteLink to={`postDetail/${postItem.id}`}>
                                    <Image
                                        src={`${DEVELOP_IMAGE_URL}/${postItem.image[0]}`}
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
                                </Box>
                                <Tag size="lg" colorScheme="none" borderRadius="full">
                                    <Avatar
                                        src="https://bit.ly/sage-adebayo"
                                        size="md"
                                        name="Segun Adebayo"
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>{postItem.account_name}</TagLabel>{" "}
                                    <FaHeart color="red" /> {postItem.count}
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
            ) : (
                <></>
            )}
            {userPostList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {userPostList.map((postItem) => (
                        <div key={`postItem_${postItem.id}`}>
                            <Box maxW="sm" borderRadius="lg" overflow="hidden">
                                <RouteLink to={`postDetail/${postItem.id}`}>
                                    <Image
                                        src={`${DEVELOP_IMAGE_URL}/${postItem.image[0]}`}
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
                                </Box>
                                <Tag size="lg" colorScheme="none" borderRadius="full">
                                    <Avatar
                                        src="https://bit.ly/sage-adebayo"
                                        size="md"
                                        name="Segun Adebayo"
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>{postItem.account_name}</TagLabel>{" "}
                                    <FaHeart color="red" /> {postItem.count}
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
            ) : (
                <></>
            )}

            <ScrollToTopButton />
        </div>
    );
}

export default SocialPlatform;
