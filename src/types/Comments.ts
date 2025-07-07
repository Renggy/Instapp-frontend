import type { Post } from "./Posts";
import type { User } from "./Users";

export interface Comment {
  post_id           : number,
  user_id           : number,
  post_comment_text : string,
  created_at        : string, // Castring Attribute Diff For Humans
  post?             : Post,
  user?             : User
}
