import React from 'react';
import { Avatar, Box, Link, SimpleGrid, Tag, TagLabel, Image } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { PostItem } from '../../Redux/activity-platform/postState'
import { RootState } from '../../Redux/state';
import { FaHeart } from 'react-icons/fa';
// import { post } from 'fetch-mock';

function PostItem() {
    // const {item_id} = props
    // const item = useSelector((state: RootState)=> state.posts.find(item=> item.id === item_id)
    const postItem1 = {
        // id: 1,
        imageUrl: "https://image.shutterstock.com/image-photo/skateboarder-action-venice-beach-skate-600w-541145566.jpg",
        imageAlt: "SkateBoardLogo",
        title: "Fancy Style Design",
        description: "My 1st design when I was 15",
    };
    const userName = "Jason";
    const numLikes = 190;

    
    return (
        <div>
            {/* <h2>PostItem #{postItem.id}{' '}
            <Link to={routes.postitem({item_id})}>
                <button>details</button>
            </Link>            
            </h2> */}
            <SimpleGrid columns={[2, null, 3]} spacing="40px" margin="5rem">
            <Box maxW="sm"  borderRadius="lg" overflow="hidden">
                        <Image src={postItem1.imageUrl} alt={postItem1.imageAlt} border="1px" borderRadius="lg"/>
                        {/* <Box>{postItem.id}</Box> */}
                        <Box p="6">
                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                noOfLines={1}
                            >
                                {postItem1.title}
                            </Box>

                            <Box>{postItem1.description}</Box>
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
        </div>
    );
}

export default PostItem;