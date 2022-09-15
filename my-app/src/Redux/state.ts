import { PostItem, PostListState } from './platform/postState';

export * from './platform/postState';

export type RootState = {
  postList: PostListState

}