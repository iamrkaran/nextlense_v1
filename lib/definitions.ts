export type AccessToken = string;

export type User = {
  _id: string;
  id: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  savedPosts: any[];
  followers: any[];
  following: any[];
  isDeleted: boolean;
  isOnBoardingComplete: boolean;
  isVerified: boolean;
  isOAuthUser: boolean;
  accessToken: string;
};

export interface AdapterUser extends User {
  id: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  savedPosts: any[];
  followers: any[];
  following: any[];
  isDeleted: boolean;
  isOnBoardingComplete: boolean;
  isVerified: boolean;
  isOAuthUser: boolean;
  accessToken: string;
}

export type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: any[];
  comments: any[];
  user: User;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
};

export type Comment = {
  _id: string;
  content: string;
  user: User;
  post: Post;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  _id: string;
  user: User;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export type Message = {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  users: User[];
  messages: Message[];
  updatedAt: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export type PostState = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
};

export type CommentState = {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
};

export type NotificationState = {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
};

export type MessageState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
};

export type ChatState = {
  chats: Chat[];
  isLoading: boolean;
  error: string | null;
};

export type RootState = {
  user: UserState;
  post: PostState;
  comment: CommentState;
  notification: NotificationState;
  message: MessageState;
  chat: ChatState;
};
