import React, {useState} from "react";
import { Box, Image, SimpleGrid, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import PostItem from "./PostItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/state";
import { addPostListAction } from "../../Redux/activity-platform/action";


 
function PostForm() {
// function PostForm({ children }: React.PropsWithChildren) {
//     const postIdList = useSelector((state: RootState) => state.postList.map(item => item.id));

//     const [newPost, setNewPost] = useState('')
//     const dispatch = useDispatch()

//     function addPost() {
//         dispatch(addPostListAction(newPost))
//         setNewPost('')
//     }
    const postItem = {
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
    };
    const userName = "Jason";
    const numLikes = 190;


    return (
        <div>
            <>
                
                {/* <PostItem /> */}

                <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
                    
                    <Box maxW="sm"  borderRadius="lg" overflow="hidden">
                        <Image src={postItem.imageUrl} alt={postItem.imageAlt} border="1px" borderRadius="lg"/>

                        <Box p="6">
                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                noOfLines={1}
                            >
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
                            <TagLabel>{userName}</TagLabel> <FaHeart color="red" /> {numLikes}
                        </Tag>
                       
                    </Box>

                    <Box maxW="sm"  borderRadius="lg" overflow="hidden">
                        <Image src={postItem.imageUrl} alt={postItem.imageAlt} border="1px" borderRadius="lg"/>

                        <Box p="6">
                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                noOfLines={1}
                            >
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
                            <TagLabel>{userName}</TagLabel> <FaHeart color="red" /> {numLikes}
                        </Tag>
                       
                    </Box>

                    <Box maxW="sm"  borderRadius="lg" overflow="hidden">
                        <Image src={postItem.imageUrl} alt={postItem.imageAlt} border="1px" borderRadius="lg"/>

                        <Box p="6">
                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                noOfLines={1}
                            >
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
                            <TagLabel>{userName}</TagLabel> <FaHeart color="red" /> {numLikes}
                        </Tag>
                       
                    </Box>

                    
                </SimpleGrid>
            </>
        </div>
    );
}

export default PostForm;


