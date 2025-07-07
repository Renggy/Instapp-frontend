import type { Comment } from "./Comments";
import type { User } from "./Users";

export interface Post {
  post_id         : number;
  user_id         : number;
  post_caption    : string;
  post_media_url  : string;
  created_at      : string; // Diff For Humans
  updated_at      : string;
  user?           : User,
  comments?       : Comment[],
  likes_count?    : number,
  comments_count? : number,
  is_like?        : boolean,
  comment_user?   : string,
}
