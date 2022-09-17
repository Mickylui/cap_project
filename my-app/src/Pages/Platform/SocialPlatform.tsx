import { Button, Center, HStack, Input } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import { Link as ReachLink } from "@reach/router";
import React from "react";
import PostForm from "./PostForm";
import { Link } from "react-router-dom";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";

function SocialPlatform() {
    const postItems = [
        {
        id: 1,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 2,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 3,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 4,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 5,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 6,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 4,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 5,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
        {
        id: 6,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
        userName: "Jason",
        numLikes: 190,
    },
]
    return (
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
            <RouteLink to="form">
                <Button size="md">
                    <FaPlusCircle />
                </Button>
            </RouteLink>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                {postItems.map((postItem)=> 
                (
                    <RouteLink to="postDetail">
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
                        <RouteLink to="reportPost">
                            <Button>
                                <WarningTwoIcon />
                            </Button>
                        </RouteLink>
                    </Box>
                </RouteLink>
                ))}
            </SimpleGrid>
            <ScrollToTopButton />
        </div>
    );
}

export default SocialPlatform;
