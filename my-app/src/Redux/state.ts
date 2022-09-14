import { PostItem, PostListState } from './activity-platform/postState';

export * from './activity-platform/postState';

export type RootState = {
  postList: PostListState

}