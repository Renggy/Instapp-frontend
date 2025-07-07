export interface User {
  user_id?             : number,
  user_name            : string,
  user_full_name       : string,
  user_email           : string,
  user_bio             : string,
  user_avatar?         : string,
  post_count?          : number,
  followers_count?     : number,
  followings_count?    : number,
  is_following?        : boolean,
}
