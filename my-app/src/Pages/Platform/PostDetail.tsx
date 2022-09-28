import { Box, Tag, Avatar, TagLabel, HStack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import ImageGallery from "react-image-gallery";
import "../css/postDetail.css";
import { getPostDetailByPostIdFetch } from "../../Api/platformFetch";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BackButton } from "../../Components/BackButton";
import { useParams } from "react-router-dom";

const buttonColor = "rgb(255,20,147)";
const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const DEVELOP_HOST = process.env.REACT_APP_API_URL;

function PostDetail() {
    const dispatch: AppDispatch = useDispatch();
    const postDetail = useSelector((state: RootState) => state.platform.postDetail);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    const [like, setLike] = useState(1);

    let userId: number | string;
    let isAdmin: boolean;
    console.log("postDetail:", postDetail);
    if (combineUserData.length > 0) {
        userId = combineUserData[0].id as number;
        isAdmin = combineUserData[0].is_admin as boolean;
    } else {
        userId = 1;
        isAdmin = false;
    }

    const { postId } = useParams();
    useEffect(() => {
        dispatch(getPostDetailByPostIdFetch(postId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [like]);

    const images = useMemo(
        () =>
            postDetail["image"].map((img) =>
                !img
                    ? {
                          original: `https://random.imagecdn.app/1000/1000`,
                          thumbnail: `https://random.imagecdn.app/1000/1000`,
                      }
                    : {
                          original: `${DEVELOP_IMAGE_URL}/posts/${img}`,
                          thumbnail: `${DEVELOP_IMAGE_URL}/posts/${img}`,
                      }
            ),
        [postDetail]
    );

    const handleLike = async () => {
        console.log("like!");
        await fetch(`${DEVELOP_HOST}/posts/likePost?postId=${postId}&userId=${userId}`);
        setLike(like + 1);
    };

    const handleDislike = async () => {
        console.log("dislike!");
        await fetch(`${DEVELOP_HOST}/posts/dislikePost?postId=${postId}&userId=${userId}`);
        setLike(like - 1);
    };

    console.log("postDetail.updated_at:", postDetail.updated_at);

    return (
        <div>
            <Box
                p="2rem"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m="4rem"
                position={"relative"}
            >
                <div className="post_detail_back_button">
                    <BackButton />
                </div>
                <HStack marginTop={"50px"}>
                    <Box paddingLeft="200" className="image-gallery-box">
                        <ImageGallery
                            items={images}
                            showBullets={true}
                            showIndex={true}
                            showThumbnails={false}
                            lazyLoad={true}
                            showPlayButton={false}
                        />
                    </Box>
                    <Box paddingLeft="100">
                        <Box
                            marginBottom={"10px"}
                            fontWeight="bold"
                            as="h4"
                            lineHeight="tight"
                            fontSize={"70px"}
                            textAlign={"start"}
                        >
                            {postDetail.title}
                        </Box>
                        <HStack>
                            <Box>{new Date(postDetail.updated_at).toString().substring(0, 25)}</Box>
                        </HStack>
                        <Text
                            marginTop={"3em"}
                            textAlign={"start"}
                            className={"post_detail_description"}
                        >
                            {postDetail.description}
                        </Text>
                        {postDetail.is_event ? (
                            <div className="post_detail_event_info_container">
                                <Box mt="1rem" className="post_detail_event_info">
                                    <span className="event_post_title">Location:</span>{" "}
                                    <span className="post_detail_event">
                                        {postDetail.event_location}
                                    </span>
                                </Box>
                                <Box mt="1rem" className="post_detail_event_info">
                                    <span className="event_post_title">Time:</span>{" "}
                                    <span className="post_detail_event">
                                        {postDetail.event_time}
                                    </span>
                                </Box>
                                <Box mt="1rem" className="post_detail_event_info">
                                    <span className="event_post_title">contact:</span>{" "}
                                    <span className="post_detail_event">{postDetail.contact}</span>
                                </Box>
                            </div>
                        ) : (
                            <></>
                        )}
                        <Flex marginTop="2rem" justifyContent={"left"}>
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
                        </Flex>

                        <Tag
                            className="post_detail_user_info"
                            size="lg"
                            colorScheme="none"
                            borderRadius="full"
                        >
                            {postDetail.is_ordinary ? (
                                <Avatar
                                    backgroundColor={"black"}
                                    size="md"
                                    name={`${postDetail.account_name}`}
                                    ml={-1}
                                    mr={2}
                                />
                            ) : (
                                <Avatar
                                    src={`${DEVELOP_IMAGE_URL}/users/${postDetail.icon}`}
                                    size="md"
                                    name={`${postDetail.account_name}`}
                                    ml={-1}
                                    mr={2}
                                />
                            )}
                            <TagLabel>{postDetail.account_name}</TagLabel>
                            <Flex flex={"1"} justifyContent={"flex-end"} className="post_detail_like_button_container">
                                <div className={"post_detail_like_button"}>
                                    {postDetail.is_liked_by_user.includes(true) ? (
                                        <FaHeart color="red" onClick={() => handleDislike()} />
                                    ) : (
                                        <FcLikePlaceholder onClick={() => handleLike()} />
                                    )}
                                    <div className={"post_detail_like_count"}>{postDetail.count}</div>
                                </div>
                            </Flex>
                        </Tag>
                    </Box>
                </HStack>
            </Box>
        </div>
    );
}

export default PostDetail;
// if type of post is xx -> post with image component

// otherwise -> post with pure text component
