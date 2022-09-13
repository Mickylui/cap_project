import React from 'react';
import { Link } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { PostItem, Posts } from '../../Redux/activity-platform/postState'
import { RootState } from '../../Redux/state';

function PostItem(props: {item_id: number}) {
    // const {item_id} = props
    // const item = useSelector((state: RootState)=> state.posts.find(item=> item.id === item_id)
    
    return (
        <div>
            {/* <h2>PostItem #{postItem.id}{' '}
            <Link to={routes.postitem({item_id})}>
                <button>details</button>
            </Link>            
            </h2> */}
        </div>
    );
}

export default PostItem;