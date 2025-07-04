export interface User {
  username: string;
  avatar: string;
}

export interface Post {
  id: number;
  user: User;
  imageUrl: string;
  likes: number;
  caption: string;
  commentsCount: number;
}
