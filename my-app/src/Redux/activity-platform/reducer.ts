import { PostListState } from "./postState";
import { addPostListAction } from "./action"
import { post } from "fetch-mock";

function initialState(): PostListState {
    return []
}

export function postListReducer(
   postList: PostListState = initialState(),
   action: addPostListAction) {
    if (action.type === "@@PostList/addItem") {
        const nextId = Math.max(0, ...postList.map(item => item.id + 1))
        return [
            ...postList,
            {
                id: nextId,
                title: action.title
            }
        ]
    }
    return postList
}