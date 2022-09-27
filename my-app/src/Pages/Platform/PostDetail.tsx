import { Box, Tag, Avatar, TagLabel, HStack } from "@chakra-ui/react";
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

const buttonColor = "rgb(190,162,120)";
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

    const icons = useMemo(() => {
        const result = postDetail["icon"]
            ? "https://i.pravatar.cc/1000/1000"
            : `${DEVELOP_IMAGE_URL}/users/${postDetail.icon}`;
        return result;
    }, [postDetail]);

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

    return (
        <div>
            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
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
                                    src={icons}
                                    size="md"
                                    name={`${postDetail.account_name}`}
                                    ml={-1}
                                    mr={2}
                                />
                            )}
                            <TagLabel>{postDetail.account_name}</TagLabel>{" "}
                            {postDetail.is_liked_by_user.includes(true) ? (
                                <FaHeart color="red" onClick={() => handleDislike()} />
                            ) : (
                                <FcLikePlaceholder onClick={() => handleLike()} />
                            )}
                            {postDetail.count}
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
