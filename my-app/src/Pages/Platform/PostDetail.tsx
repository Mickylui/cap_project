import { Box, Tag, Avatar, TagLabel, Image, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import ImageGallery from "react-image-gallery";
import "../css/postDetail.css";
import { getPostDetailByPostIdFetch } from "../../Api/platformFetch";

function PostDetail() {
    const postList = useSelector((state: RootState) => state.platform.list);
    const [images, setImages] = useState([]) as Array<Object>;
    // need to dispatch post list by postId
    const pathName = window.location.pathname;
    const postId = pathName.split("/")[3];
    console.log("postId:", postId);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const getPostDetailByPostId = async () => {
            await dispatch(getPostDetailByPostIdFetch(postId));
        };
        getPostDetailByPostId();
        const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
        if (postList.length > 0) {
            const postImagesArr = postList[0] as unknown as Array<string>;
            for (let i = 0; i < postImagesArr.length; i++) {
                setImages({
                    original: `${DEVELOP_IMAGE_URL}/${postImagesArr[i]}`,
                    thumbnail: `${DEVELOP_IMAGE_URL}/${postImagesArr[i]}`,
                });
            }
            console.log("this is images:", images);
        }
    }, []);

    console.log("this is postList:", postList);

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

    // let images = [];
    // const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    // const imageDataArr = postList[0]["image"];
    // console.log("imageDataArr:", imageDataArr);
    // for (let i = 0; i < imageDataArr.length; i++) {
    //     images.push({
    //         original: `${DEVELOP_IMAGE_URL}/${imageDataArr[i]}`,
    //         thumbnail: `${DEVELOP_IMAGE_URL}/${imageDataArr[i]}`,
    //     });
    // }
    // console.log("images:", images);

    // need to seperate the style : isOwner / isAdmin, hasImage / noImage
    return (
        <div>
            {/* box w/ image */}

            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                <HStack>
                    {/* <Image
                        src={postItem.imageUrl}
                        alt={postItem.imageAlt}
                        border="1px"
                        borderRadius="lg"
                    /> */}
                    <Box className="image-gallery-box">
                        {/* <ImageGallery
                            items={images}
                            showBullets={true}
                            showIndex={true}
                            showThumbnails={false}
                            lazyLoad={true}
                            showPlayButton={false}
                        /> */}
                    </Box>
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
                        <Box m="2rem">
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
                    <Box m="2rem">
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
