import { Box, Tag, Avatar, TagLabel, Image, HStack, VStack, Button } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import ImageGallery from "react-image-gallery";
import "../css/postDetail.css";
import { getPostDetailByPostIdFetch } from "../../Api/platformFetch";
import { PostState } from "../../Redux/Slice/platformSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BackButton } from "../../Components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const buttonColor = "rgb(190,162,120)";
function PostDetail() {
    const dispatch: AppDispatch = useDispatch();
    const postDetail = useSelector((state: RootState) => state.platform.postDetail);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    const [images, setImages] = useState<Array<any>>([]);
    const [like, setLike] = useState(1);


    const { postId } = useParams();


    let userId: number | string;
    let isAdmin: boolean;
    // console.log("combineUserData:", combineUserData);
    // console.log("postDetail:", postDetail);
    if (combineUserData.length > 0) {
        userId = combineUserData[0].id as number;
        isAdmin = combineUserData[0].is_admin as boolean;
    } else {
        userId = 1;
        isAdmin = false;
    }

    useEffect(() => {
        const getPostDetailByPostId = async () => {
            console.log("getPostDetailByPostId userId:", userId);
            await dispatch(getPostDetailByPostIdFetch({ postId: postId, userId: userId }));
        };
        getPostDetailByPostId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combineUserData, like]);

    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    const postImagesArr = postDetail["image"] as unknown as Array<string>;
    useMemo(() => {
        setImages([]);
        for (let i = 0; i < postImagesArr.length; i++) {
            setImages((prevState) => [
                ...prevState,
                {
                    original: `${DEVELOP_IMAGE_URL}/posts/${postImagesArr[i]}`,
                    thumbnail: `${DEVELOP_IMAGE_URL}/posts/${postImagesArr[i]}`,
                },
            ]);
        }
    }, [postDetail]);

    const DEVELOP_HOST = process.env.REACT_APP_API_URL;
    const handleLike = async () => {
        console.log("like!");
        setLike(like + 1);
        await fetch(`${DEVELOP_HOST}/posts/likePost?postId=${postId}&userId=${userId}`);
    };

    const handleDislike = async () => {
        console.log("dislike!");
        setLike(like - 1);
        await fetch(`${DEVELOP_HOST}/posts/dislikePost?postId=${postId}&userId=${userId}`);
    };

    return (
        <div>
            {postDetail.image[0] !== null ? (
                <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                    {/* <BackButton back={()=>navigate("/platform/posts")}/> */}
                    <BackButton />
                    <HStack>
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
                            {postDetail.user_id === userId || isAdmin ? (
                                <Box>
                                    <AiFillEdit />
                                    <AiFillDelete />
                                </Box>
                            ) : (
                                <></>
                            )}

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
                                        backgroundColor={buttonColor}
                                    >
                                        {tagItem}
                                    </Tag>
                                ))}
                            </Box>

                            <Tag size="lg" colorScheme="none" borderRadius="full">
                                <Avatar
                                    src={`${DEVELOP_IMAGE_URL}/users/${postDetail.icon}`}
                                    size="md"
                                    name={`${postDetail.account_name}`}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{postDetail.account_name}</TagLabel>{" "}
                                {postDetail.is_dislike[0] === false &&
                                postDetail.is_liked_by_user[0] === true ? (
                                    <FaHeart color="red" onClick={() => handleDislike()} />
                                ) : (
                                    <FcLikePlaceholder onClick={() => handleLike()} />
                                )}
                                {postDetail.count}
                            </Tag>
                        </Box>
                    </HStack>
                </Box>
            ) : (
                <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="2rem">
                    <Box p="6">
                        <BackButton />
                        {postDetail.user_id === userId || isAdmin ? (
                            <Box>
                                <AiFillEdit />
                                <AiFillDelete />
                            </Box>
                        ) : (
                            <></>
                        )}
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
                                    backgroundColor={buttonColor}
                                >
                                    {tagItem}
                                </Tag>
                            ))}
                        </Box>
                        <Tag size="lg" colorScheme="none" borderRadius="full">
                            <Avatar
                                src={`${DEVELOP_IMAGE_URL}/users/${postDetail.icon}`}
                                size="md"
                                name="Segun Adebayo"
                                ml={-1}
                                mr={2}
                            />
                            <TagLabel>{postDetail.account_name}</TagLabel>
                            {postDetail.is_dislike[0] === false &&
                            postDetail.is_liked_by_user[0] === true ? (
                                <FaHeart color="red" onClick={() => handleDislike()} />
                            ) : (
                                <FcLikePlaceholder onClick={() => handleLike()} />
                            )}{" "}
                            {postDetail.count}
                        </Tag>
                    </Box>
                </Box>
            )}
        </div>
    );
}

export default PostDetail;
// if type of post is xx -> post with image component

// otherwise -> post with pure text component
