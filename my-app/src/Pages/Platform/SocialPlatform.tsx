import { Button, Center, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import PostForm from "./PostForm";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import { getPostFetch, getSearchTagPostFetch } from "../../Api/PlatformFetch";
import { AppDispatch, RootState, store } from "../../Redux/store";
import { useSelector } from "react-redux";

const suggestedTags = [
    { id: 1, tag: "a" },
    { id: 2, tag: "b" },
];

function SocialPlatform() {
    const dispatch: AppDispatch = useDispatch();
    const postList = useSelector((state: RootState) => state.platform.list);
    const [searchTag, setSearchTag] = useState("");
    const [searchContent, setSearchContent] = useState("");
    console.log("postList:", postList);
    console.log("searchTag:", searchTag);

    // Search Tags: if searchTag.length > 0 -> fetch this tag and replace state.platform.list;
    // Search Content: form submit -> fetch this content and replace state.platform.list;

    async function getPost() {
        const getPostResponse = await dispatch(getPostFetch());
        console.log("this is getPostResponse:", getPostResponse);
        return;
    }
    async function handleSearch(e) {
        const form = e.target;
        console.log("this is form:", form);
        return;
    }
    useEffect(() => {
        // console.log("state:", store.getState());
        getPost();
    }, []);

    if (searchTag.length > 0) {
        getSearchTagPost();
    }
    async function getSearchTagPost() {
        console.log("search!");

        const getSearchTagPostResp = await dispatch(getSearchTagPostFetch(searchTag));
        console.log("getSearchTagPostResp:", getSearchTagPostResp);
        return;
    }
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
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                {postList.map((postItem) => (
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
