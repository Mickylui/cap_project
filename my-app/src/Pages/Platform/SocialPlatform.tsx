import { Button, Input } from '@chakra-ui/react';
import React from 'react';
import PostForm from './PostForm';

function SocialPlatform() {
    return (
        <div>
            <Input
                    size="lg"
                    htmlSize={70}
                    width="auto"
                    margin="50px"
                    placeholder="Search keywords or tags"
                    type="text"
                    value=""
                    onChange={e=>e.target.value}
                />
                <Button colorScheme="teal" size="md">
                    Search
                </Button>
            <PostForm />
        </div>
    );
}

export default SocialPlatform;