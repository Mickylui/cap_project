import { Button, HStack, Input, TagCloseButton } from "@chakra-ui/react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
// import PostForm from "./PostForm";
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

const suggestedTags = [
    { tag: "practice" },
    { tag: "gathering" },
    { tag: "talk" },
    { tag: "recruitment" },
    { tag: "lesson-information" },
    { tag: "product-promotion" },
    { tag: "skateboard-design" },
    { tag: "art-related-workshop" },
    { tag: "skateboard-maintenance" },
    { tag: "competition" },
    { tag: "skateboard-performance" },
    { tag: "question" },
    { tag: "sharing" },
];

const buttonColor = "rgb(190,162,120)";
function SocialPlatform() {
    const dispatch: AppDispatch = useDispatch();

    const userList = useSelector((state: RootState) => state.platform.userList);
    const adminList = useSelector((state: RootState) => state.platform.adminList);
    const searchList = useSelector((state: RootState) => state.platform.searchList);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);

    const [searchTag, setSearchTag] = useState("");
    const [searchContent, setSearchContent] = useState("");

    let userId: number = 1;
    if (combineUserData.length > 0) {
        userId = combineUserData[0].id as number;
    }

    const handleScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            console.log("scroll");
            dispatch(getUserPostFetch({ userId: userId }));
        }
    };

    const handleNoTag = () => {
        setSearchTag("");
        dispatch(getUserPostFetch({ userId: userId }));
        dispatch(getAdminPostFetch(userId));
    };

    useEffect(() => {
        dispatch(getUserPostFetch({ userId: userId }));
        dispatch(getAdminPostFetch(userId));
        console.log("searchList.length:", searchList.length);
        if (searchList.length <= 0) {
            window.addEventListener("scroll", handleScroll);
        }
        // window.removeEventListener("scroll", handleScroll);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combineUserData]);

    useMemo(() => {
        const fetchSearchTag = async () => {
            await dispatch(getSearchTagPostFetch({ tag: searchTag, userId: userId }));
        };

        if (searchTag !== "") {
            fetchSearchTag();
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTag]);

    useMemo(() => {
        const fetchContent = async () => {
            await dispatch(getSearchContentPostFetch({ keyword: searchContent, userId: userId }));
        };
        if (searchContent !== "") {
            fetchContent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchContent]);

    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

    return (
        // postList.is_ordinary === true -> admin post
        <div>
            {searchTag.length > 0 ? (
                <div>
                    <HStack spacing={4} className="button-area" margin={"20px"}>
                        <h1>You are searching</h1>
                        <Tag borderRadius="full" variant="solid" backgroundColor={buttonColor}>
                            <TagLabel>{searchTag}</TagLabel>
                            <TagCloseButton onClick={() => handleNoTag()} />
                        </Tag>
                        <h1>,the result is below:</h1>
                    </HStack>
                    <RouteLink to="/platform/form" replace={true}>
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
                            console.log("going backkk")
                            await dispatch(getUserPostFetch({ userId }));
                            await dispatch(getAdminPostFetch(userId));
                        }
                    }}
                >
                    <div className="button-area">
                        <Input
                            size="lg"
                            htmlSize={70}
                            width="70%"
                            marginLeft={"20px"}
                            marginRight={"10px"}
                            placeholder="Search keywords or tags"
                            type="text"
                            name="searchContent"
                        />
                        <Button bgColor={buttonColor} size="md" type="submit" marginRight={"20px"}>
                            Search
                        </Button>
                        <RouteLink to="/platform/form" replace={true}>
                            <Button size="md" bgColor={buttonColor}>
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
                        borderRadius="full"
                        variant="solid"
                        backgroundColor={buttonColor}
                    >
                        <TagLabel
                            onClick={() => setSearchTag(suggestedTag.tag)}
                            width={"fit-content"}
                        >
                            {suggestedTag.tag}
                        </TagLabel>
                    </Tag>
                ))}
            </HStack>
            {searchList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {searchList.map((postItem) => (
                        <div key={`postItem_${postItem.id}`} className={"post-item"}>
                            <Box maxW="sm" borderRadius="lg" overflow="hidden">
                                <>
                                    {postItem.image[0] !== null ? (
                                        <>
                                            <RouteLink
                                                to={`/postDetail/${postItem.id}`}
                                                replace={true}
                                            >
                                                <Image
                                                    src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                                    alt={`image of postId:${postItem.id}`}
                                                    border="1px"
                                                    borderRadius="lg"
                                                />
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
                                        </>
                                    ) : (
                                        <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                            <Box p="6">
                                                <Box
                                                    // mt="1"
                                                    fontWeight="semibold"
                                                    fontSize={"2em"}
                                                    as="h4"
                                                    lineHeight="tight"
                                                    // noOfLines={1}
                                                    className="title"
                                                >
                                                    {postItem.title}
                                                </Box>
                                            </Box>
                                        </RouteLink>
                                    )}
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
                                            <Avatar
                                                src={`${DEVELOP_IMAGE_URL}/users/${postItem.icon}`}
                                                size="md"
                                                name={`${postItem.account_name}`}
                                                ml={-1}
                                                mr={2}
                                            />
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
                                        <RouteLink to="reportPost">
                                            <Button>
                                                <WarningTwoIcon />
                                            </Button>
                                        </RouteLink>
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
                            <Box maxW="sm" borderRadius="lg" overflow="hidden">
                                <>
                                    {postItem.image[0] !== null ? (
                                        <>
                                            <RouteLink
                                                to={`/postDetail/${postItem.id}`}
                                                replace={true}
                                            >
                                                <Image
                                                    src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                                    alt={`image of postId:${postItem.id}`}
                                                    border="1px"
                                                    borderRadius="lg"
                                                />
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
                                        </>
                                    ) : (
                                        <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                            <Box p="6">
                                                <Box
                                                    // mt="1"
                                                    fontWeight="semibold"
                                                    fontSize={"2em"}
                                                    as="h4"
                                                    lineHeight="tight"
                                                    // noOfLines={1}
                                                    className="title"
                                                >
                                                    {postItem.title}
                                                </Box>
                                            </Box>
                                        </RouteLink>
                                    )}
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
                                            <Avatar
                                                src={`${DEVELOP_IMAGE_URL}/users/${postItem.icon}`}
                                                size="md"
                                                name={`${postItem.account_name}`}
                                                ml={-1}
                                                mr={2}
                                            />
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
                                        <RouteLink to="reportPost">
                                            <Button>
                                                <WarningTwoIcon />
                                            </Button>
                                        </RouteLink>
                                    </Tag>
                                </>
                            </Box>
                        </div>
                    ))}
                </SimpleGrid>
            ) : (
                <></>
            )}

            {/* </InfiniteScroll> */}
            {/* <div style={{ height: "100%", overflowY: "scroll" }}>
                <InfiniteScroll
                    dataLength={displayUserItems.length}
                    next={fetchMoreUserData}
                    hasMore={handleHasMoreData}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                > */}
            {userList.length > 0 ? (
                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    {userList.map((postItem, index) => (
                        <div key={`postItem_${postItem.id}`} className={"post-item"}>
                            <Box maxW="sm" borderRadius="lg" overflow="hidden">
                                {postItem.image[0] !== null ? (
                                    <>
                                        <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
                                            <Image
                                                src={`${DEVELOP_IMAGE_URL}/posts/${postItem.image[0]}`}
                                                alt={`image of postId:${postItem.id}`}
                                                // borderRadius="lg"
                                            />
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
                                    </>
                                ) : (
                                    <RouteLink to={`/postDetail/${postItem.id}`} replace={true}>
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
                                    </RouteLink>
                                )}
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
                                        <Avatar
                                            src={`${DEVELOP_IMAGE_URL}/users/${postItem.icon}`}
                                            size="md"
                                            name={`${postItem.account_name}`}
                                            ml={-1}
                                            mr={2}
                                        />
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
                                    <RouteLink to="reportPost">
                                        <Button className="user-profile-button">
                                            <WarningTwoIcon />
                                        </Button>
                                    </RouteLink>
                                </Tag>
                            </Box>
                            <h1>{index}</h1>
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
