export type PostListState = PostItem[]

export type PostItem =  {
    id: number;
    title: string;
    event_date: Date | null;
    event_time: string | null;
    event_location: string | null;
    description: string;
  }
  