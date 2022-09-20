import { Box, Tag, Avatar, TagLabel, Image, HStack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import ImageGallery from "react-image-gallery";
import "../css/postDetail.css";
import { getPostDetailByPostIdFetch } from "../../Api/platformFetch";
import { PostState } from "../../Redux/Slice/platformSlice";

function PostDetail() {
    const postDetail = useSelector((state: RootState) => state.platform.postDetail);
    const [images, setImages] = useState<Array<any>>([]);
    // need to dispatch post list by postId
    const pathName = window.location.pathname;
    const postId = pathName.split("/")[3];
    console.log("postDetail:", postDetail);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const getPostDetailByPostId = async () => {
            await dispatch(getPostDetailByPostIdFetch(postId));
        };
        getPostDetailByPostId();
    }, []);

    useEffect(() => {
        const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
        const getPostImages = () => {
            const postImagesArr = postDetail["image"] as unknown as Array<string>;
            console.log("this is postImagesArr:", postImagesArr);
            for (let i = 0; i < postImagesArr.length; i++) {
                setImages((prevState) => [
                    ...prevState,
                    {
                        original: `${DEVELOP_IMAGE_URL}/${postImagesArr[i]}`,
                        thumbnail: `${DEVELOP_IMAGE_URL}/${postImagesArr[i]}`,
                    },
                ]);
                console.log("this is images:", postImagesArr[i]);
            }
        };
        getPostImages();
    }, [postDetail]);

    console.log("this is images:", images);

    // const postItem = {
    //     imageUrl: "../SkateBoardLogo.png",
    //     imageAlt: "SkateBoardLogo",
    //     title: "Fancy Style Design",
    //     description: "My 1st design when I was 15",
    //     location: "Tsuen Wan",
    //     date: "9/16/2022",
    //     time: "15:00",
    //     contact: "123456",
    //     userName: "Jason",
    //     numLikes: 190,
    // };

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
                        <ImageGallery
                            items={images}
                            showBullets={true}
                            showIndex={true}
                            showThumbnails={false}
                            lazyLoad={true}
                            showPlayButton={false}
                        />
                    </Box>
                    <Box p="6">
                        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
                            {postDetail.title}
                        </Box>
                        <HStack>
                            <Box>{postDetail.updated_at}</Box>
                        </HStack>
                        <Box mt="3rem">{postDetail.description}</Box>
                        {postDetail.is_event ? (
                            <>
                                <Box mt="3rem">Location: {postDetail.event_location}</Box>
                                <Box mt="1rem">Time: {postDetail.event_time}</Box>
                                <Box mt="1rem">contact: {postDetail.contact}</Box>
                            </>
                        ) : (
                            <></>
                        )}
                        <Box m="2rem">
                            {postDetail.tag.map((tagItem) => (
                                <Tag
                                    key={`${tagItem}`}
                                    borderRadius="full"
                                    variant="solid"
                                    colorScheme="green"
                                >
                                    {tagItem}
                                </Tag>
                            ))}
                        </Box>

                        <Tag size="lg" colorScheme="none" borderRadius="full">
                            <Avatar
                                src="https://bit.ly/sage-adebayo"
                                size="md"
                                name="Segun Adebayo"
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{postDetail.account_name}</TagLabel> <FaHeart color="red" />{" "}
                            {postDetail.count}
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
                        {postDetail.title}
                    </Box>
                    <HStack>
                        <Box>{postDetail.updated_at}</Box>
                    </HStack>
                    <Box mt="3rem">{postDetail.description}</Box>
                    <Box m="2rem">
                        {/* {postData["tag"].map((tag) => {
                            <Tag>${tag}</Tag>;
                        })} */}
                    </Box>

                    <Tag size="lg" colorScheme="none" borderRadius="full">
                        <Avatar
                            src="https://bit.ly/sage-adebayo"
                            size="md"
                            name="Segun Adebayo"
                            ml={-1}
                            mr={2}
                        />
                        <TagLabel>{postDetail.account_name}</TagLabel> <FaHeart color="red" />{" "}
                        {postDetail.count}
                    </Tag>
                </Box>
            </Box>
        </div>
    );
}

export default PostDetail;
// if type of post is xx -> post with image component

// otherwise -> post with pure text component
