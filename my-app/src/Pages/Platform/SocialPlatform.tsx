import { Button, Input } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import { Link as ReachLink } from "@reach/router";
import React from "react";
import PostForm from "./PostForm";

function SocialPlatform() {
    const postItem = {
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    };
    return (
        <div>
            <Input
                size="lg"
                htmlSize={70}
                width="auto"
                margin="50px"
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
                <Box maxW="sm" borderRadius="lg" overflow="hidden">
                    <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    />

                    <Box p="6">
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
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
                        <TagLabel>{postItem.userName}</TagLabel> <FaHeart color="red" />{" "}
                        {postItem.numLikes}
                    </Tag>
                </Box>

                <Box maxW="sm" borderRadius="lg" overflow="hidden">
                    <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    />

                    <Box p="6">
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
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
                        <TagLabel>{postItem.userName}</TagLabel> <FaHeart color="red" />{" "}
                        {postItem.numLikes}
                    </Tag>
                </Box>

                <Box maxW="sm" borderRadius="lg" overflow="hidden">
                    <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    />

                    <Box p="6">
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
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
                        <TagLabel>{postItem.userName}</TagLabel> <FaHeart color="red" />{" "}
                        {postItem.numLikes}
                    </Tag>
                </Box>
            </SimpleGrid>
        </div>
    );
}

export default SocialPlatform;
