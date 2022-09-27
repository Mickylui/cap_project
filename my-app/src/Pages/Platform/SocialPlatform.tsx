import { Button, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { useDispatch } from "react-redux";
import {
    getUserPostFetch,
    getSearchContentPostFetch,
    getSearchTagPostFetch,
    getAdminPostFetch,
} from "../../Api/platformFetch";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { FcLikePlaceholder } from "react-icons/fc";
import "../css/socialPlatform.css";

const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const suggestedTags = [
    { tag: "practice" },
    { tag: "gathering" },
    { tag: "talk" },
    { tag: "recruitment" },
    { tag: "lesson information" },
    { tag: "product promotion" },
    { tag: "skateboard design" },
    { tag: "art related workshop" },
    { tag: "skateboard maintenance" },
    { tag: "competition" },
    { tag: "skateboard performance" },
    { tag: "question" },
    { tag: "sharing" },
];

const buttonColor = "rgb(255,20,147)";

function SocialPlatform() {
    const dispatch: AppDispatch = useDispatch();

    const userList = useSelector((state: RootState) => state.platform.userList);
    console.log(userList);
    const adminList = useSelector((state: RootState) => state.platform.adminList);
    const searchList = useSelector((state: RootState) => state.platform.searchList);
    const [searchTag, setSearchTag] = useState("");
    const [searchContent, setSearchContent] = useState("");

    useEffect(() => {
        dispatch(getUserPostFetch({ init: true }));
        dispatch(getAdminPostFetch());
    }, [dispatch]);

    const handleScroll = useCallback(
        (e) => {
            if (
                window.innerHeight + e.target.documentElement.scrollTop + 1 >=
                e.target.documentElement.scrollHeight
            ) {
                console.log("scroll");
                window.removeEventListener("scroll", handleScroll);
                dispatch(getUserPostFetch({ init: false }));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (searchList.length <= 0) {
            window.removeEventListener("scroll", handleScroll);
            window.addEventListener("scroll", handleScroll);
        }
        // window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList]);

    useMemo(() => {
        if (searchTag !== "") {
            dispatch(getSearchTagPostFetch({ tag: searchTag }));
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTag]);

    useMemo(() => {
        if (searchContent !== "") {
            dispatch(getSearchContentPostFetch({ keyword: searchContent }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchContent]);

    // const icons = useMemo(() => {
    //     const result = userList["icon"]
    //         ? "https://i.pravatar.cc/1000/1000"
    //         : `${DEVELOP_IMAGE_URL}/users/${postDetail.icon}`;
    //     return result;
    // }, [userList]);

    return (
        // postList.is_ordinary === true -> admin post
        <div>
            {searchTag.length > 0 ? (
                <div>
                    <HStack spacing={4} className="button-area" margin={"20px"}>
                        <h1>You are searching</h1>
                        <Tag borderRadius="full" variant="solid" backgroundColor={buttonColor}>
                            <TagLabel>{searchTag}</TagLabel>
                            <TagCloseButton
                                onClick={() => {
                                    setSearchTag("");
                                    dispatch(getUserPostFetch({ init: true }));
                                    dispatch(getAdminPostFetch());
                                }}
                            />
                        </Tag>
                        <h1>,the result is below:</h1>
                    </HStack>
                    <RouteLink to="/platform/form" replace>
                        <Button size="md" bgColor={buttonColor} marginBottom={"20px"}>
                            <FaPlusCircle />
                        </Button>
                    </RouteLink>
                </div>
            ) : (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target;
                        const keyword = form.searchContent.value;
                        if (keyword.length > 0) {
                            setSearchContent(keyword);
                        } else {
                            console.log("going backkk");
                            await dispatch(getUserPostFetch({ init: true }));
                            await dispatch(getAdminPostFetch());
                        }
                    }}
                >
                    <div className="button-area">
                        <Input
                            size="lg"
                            htmlSize={70}
                            width="80%"
                            marginLeft={"20px"}
                            marginRight={"10px"}
                            outline={"dashed black"}
                            placeholder="Search keywords or tags"
                            type="text"
                            name="searchContent"
                        />
                        <Button bgColor={"gray.700"} color={'white'} size="md" type="submit" marginRight={"20px"}>
                            Search
                        </Button>
                        <RouteLink to="/platform/form" replace={true}>
                            <Button size="md" bgColor={"gray.700"} color={'white'}>
                                <FaPlusCircle />
                            </Button>
                        </RouteLink>
                    </div>
                </form>
            )}

            <HStack spacing={4} className="tags-area">
                {suggestedTags.map((suggestedTag, index) => (
                    <Tag
                        key={suggestedTag.id}
                        borderRadius="10"
                        border={"dashed black"}
                        variant="solid"
                        backgroundColor={buttonColor}
                        width={'fit-content'}
                        height={50}
                        margin={5}
                        fontSize={20}
                    >
                        <TagLabel
                            onClick={() => setSearchTag(suggestedTag.tag)}
                            width={"fit-content"}
                        >
                            #{suggestedTag.tag}
                        </TagLabel>
                    </Tag>
                ))}
            </HStack>
            {searchList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {searchList.map((postItem) => (
                        <div key={`postItem_${postItem.id}`} className={"post-item"}>
                            <Box maxW="sm" borderRadius="lg">
                                <>
                                    <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                        {postItem.image[0] !== null ? (
                                            <Image
                                                src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                                alt={`image of postId:${postItem.id}`}
                                                border="1px"
                                                borderRadius="lg"
                                            />
                                        ) : (
                                            <Image
                                                src={"https://random.imagecdn.app/1000/1000"}
                                                alt={`image of postId:${postItem.id}`}
                                                border="1px"
                                                borderRadius="lg"
                                                width={"250px"}
                                                height={"300px"}
                                            />
                                        )}
                                    </RouteLink>
                                    <Box p="6">
                                        <Box
                                            // mt="1"
                                            fontWeight="semibold"
                                            fontSize={"2em"}
                                            as="h4"
                                            lineHeight="tight"
                                            // noOfLines={1}
                                            backgroundColor={"white"}
                                            className="title"
                                        >
                                            {postItem.title}
                                        </Box>
                                    </Box>

                                    {postItem.tag.map((item) => (
                                        <Tag
                                            onClick={(e) => {
                                                setSearchTag(e.target.innerHTML);
                                            }}
                                            className="tags"
                                        >
                                            {item}
                                        </Tag>
                                    ))}
                                    <Tag
                                        size="lg"
                                        colorScheme="none"
                                        borderRadius="full"
                                        className="user-profile"
                                    >
                                        <RouteLink to={`/user/${postItem.user_id}`} replace={true}>
                                            {postItem.is_ordinary ? (
                                                <Avatar
                                                    backgroundColor={"black"}
                                                    size="md"
                                                    name={`${postItem.account_name}`}
                                                    ml={-1}
                                                    mr={2}
                                                />
                                            ) : (
                                                <Avatar
                                                    src={"https://i.pravatar.cc/1000/1000"}
                                                    size="md"
                                                    name={`${postItem.account_name}`}
                                                    ml={-1}
                                                    mr={2}
                                                />
                                            )}
                                        </RouteLink>
                                        <h1>{postItem.account_name}</h1>
                                        <div className="like-button">
                                            {postItem.is_liked_by_user.includes(true) ? (
                                                <FaHeart color="red" />
                                            ) : (
                                                <FcLikePlaceholder />
                                            )}
                                            {postItem.count}
                                        </div>
                                    </Tag>
                                </>
                            </Box>
                        </div>
                    ))}
                </SimpleGrid>
            ) : (
                <></>
            )}
            {adminList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {adminList.map((postItem) => (
                        <div key={`postItem_${postItem.id}`} className={"post-item"}>
                            <Box maxW="sm" borderRadius="lg">
                                <>
                                    <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                        {postItem.image[0] !== null ? (
                                            <div className="post_image_container">
                                            <Image
                                                src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                                alt={`image of postId:${postItem.id}`}
                                                border="1px"
                                                borderRadius="lg"
                                                className="post_image"   
                                            />
                                            </div>
                                        ) : (<div className="post_image_container">
                                            <Image
                                                src={"https://random.imagecdn.app/1000/1000"}
                                                alt={`image of postId:${postItem.id}`}
                                                border="1px"
                                                borderRadius="lg"
                                                className="post_image"
                                            />
                                            </div>
                                        )}
                                    </RouteLink>
                                    <Box p="6">
                                        <Box
                                            // mt="1"
                                            fontWeight="semibold"
                                            fontSize={"2em"}
                                            as="h4"
                                            lineHeight="tight"
                                            // noOfLines={1}
                                            backgroundColor={"white"}
                                            className="title"
                                        >
                                            {postItem.title}
                                        </Box>
                                    </Box>

                                    {postItem.tag.map((item) => (
                                        <Tag
                                            onClick={(e) => {
                                                setSearchTag(e.target.innerHTML);
                                            }}
                                            className="tags"
                                        >
                                            {item}
                                        </Tag>
                                    ))}
                                    <Tag
                                        size="lg"
                                        colorScheme="none"
                                        borderRadius="full"
                                        className="user-profile"
                                    >
                                        <RouteLink to={`/user/${postItem.user_id}`} replace={true}>
                                            {postItem.is_ordinary ? (
                                                <Avatar
                                                    backgroundColor={"black"}
                                                    size="md"
                                                    name={`${postItem.account_name}`}
                                                    ml={-1}
                                                    mr={2}
                                                />
                                            ) : (
                                                <Avatar
                                                    src={"https://i.pravatar.cc/1000/1000"}
                                                    size="md"
                                                    name={`${postItem.account_name}`}
                                                    ml={-1}
                                                    mr={2}
                                                />
                                            )}
                                        </RouteLink>
                                        <h1>{postItem.account_name}</h1>
                                        <div className="like-button">
                                            {postItem.is_liked_by_user.includes(true) ? (
                                                <FaHeart color="red" />
                                            ) : (
                                                <FcLikePlaceholder />
                                            )}
                                            {postItem.count}
                                        </div>
                                    </Tag>
                                </>
                            </Box>
                        </div>
                    ))}
                </SimpleGrid>
            ) : (
                <></>
            )}
            {userList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {userList.map((postItem, index) => (
                        <div key={`postItem_${postItem.id}`} className={"post-item"}>
                            <Box maxW="sm" borderRadius="lg">
                                <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                    {postItem.image[0] !== null ? (
                                        <Image
                                            src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                            alt={`image of postId:${postItem.id}`}
                                            // borderRadius="lg"
                                        />
                                    ) : (
                                        <Image
                                            src={`https://random.imagecdn.app/1000/1000`}
                                            alt={`image of postId:${postItem.id}`}
                                            // borderRadius="lg"
                                        />
                                    )}
                                </RouteLink>
                                <Box p="6">
                                    <Box
                                        // mt="1"
                                        className="title"
                                        fontWeight="semibold"
                                        fontSize={"2em"}
                                        as="h4"
                                        lineHeight="tight"
                                        // noOfLines={1}
                                        backgroundColor={"white"}
                                    >
                                        {postItem.title}
                                    </Box>
                                </Box>

                                {postItem.tag.map((item) => (
                                    <Tag
                                        onClick={(e) => {
                                            setSearchTag(e.target.innerHTML);
                                        }}
                                        className="tags"
                                    >
                                        {item}
                                    </Tag>
                                ))}
                                <Tag
                                    size="lg"
                                    colorScheme="none"
                                    borderRadius="full"
                                    className="user-profile"
                                >
                                    <RouteLink to={`/user/${postItem.user_id}`} replace={true}>
                                        {postItem.is_ordinary ? (
                                            <Avatar
                                                backgroundColor={"black"}
                                                size="md"
                                                name={`${postItem.account_name}`}
                                                ml={-1}
                                                mr={2}
                                            />
                                        ) : (
                                            <Avatar
                                                src={"https://i.pravatar.cc/1000/1000"}
                                                size="md"
                                                name={`${postItem.account_name}`}
                                                ml={-1}
                                                mr={2}
                                            />
                                        )}
                                    </RouteLink>
                                    <h1 className="user-name">{postItem.account_name}</h1>
                                    <div className="like-button">
                                        {postItem.is_liked_by_user.includes(true) ? (
                                            <FaHeart color="red" />
                                        ) : (
                                            <FcLikePlaceholder />
                                        )}
                                        {postItem.count}
                                    </div>
                                </Tag>
                            </Box>
                        </div>
                    ))}
                </SimpleGrid>
            ) : (
                <></>
            )}
            {/* </InfiniteScroll>
            </div> */}

            <ScrollToTopButton />
        </div>
    );
}

export default SocialPlatform;
