export function addPostListAction(title: string) {
    return {
        type: '@@PostList/addItem' as const,
        title
    }
}

export type addPostListAction = ReturnType<typeof addPostListAction>