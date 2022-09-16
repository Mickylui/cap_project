import { Box, Tag, Avatar, TagLabel, Image, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { FaHeart } from "react-icons/fa";

function PostDetail() {
    const postItem = {
        imageUrl: "../SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        location: "Tsuen Wan",
        date: "9/16/2022",
        time: "15:00",
        contact: "123456",
        userName: "Jason",
        numLikes: 190,
    };

    return (
        <div>
            {/* box w/ image */}
            
            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                <HStack>
                    <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    />
                    <Box p="6">
                        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
                            {postItem.title}
                        </Box>
                        <HStack>
                            <Box>{postItem.date}</Box>
                            <Box>{postItem.time}</Box>
                        </HStack>
                        <Box mt="3rem">{postItem.description}</Box>
                        <Box mt="3rem">Location: {postItem.location}</Box>
                        <Box mt="1rem">Time: {postItem.time}</Box>
                        <Box mt="1rem">contact: {postItem.contact}</Box>
                        <Box m='2rem'>
                            <Tag>design</Tag>
                            <Tag>interest</Tag>
                        </Box>

                        <Tag size="lg" colorScheme="none" borderRadius="full">
                            <Avatar
                                src="https://bit.ly/sage-adebayo"
                                size="md"
                                name="Segun Adebayo"
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{postItem.userName}</TagLabel> <FaHeart color="red" />{" "}
                            {postItem.numLikes}
                        </Tag>
                    </Box>
                </HStack>
            </Box>
            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="2rem">
                    {/* <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    /> */}

                    <Box p="6">
                        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
                            {postItem.title}
                        </Box>
                        <HStack>
                            <Box>Location{postItem.location}</Box>
                            <Box>{postItem.date}</Box>
                            <Box>{postItem.date}</Box>
                            <Box>{postItem.time}</Box>
                        </HStack>
                        <Box mt="3rem">{postItem.description}</Box>
                        <Box m='2rem'>
                            <Tag>design</Tag>
                            <Tag>interest</Tag>
                        </Box>

                        <Tag size="lg" colorScheme="none" borderRadius="full">
                            <Avatar
                                src="https://bit.ly/sage-adebayo"
                                size="md"
                                name="Segun Adebayo"
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{postItem.userName}</TagLabel> <FaHeart color="red" />{" "}
                            {postItem.numLikes}
                        </Tag>
                    </Box>
            </Box>
            
        </div>
    );
}

export default PostDetail;
// if type of post is xx -> post with image component

// otherwise -> post with pure text component
