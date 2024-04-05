export type User = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  coverPicture?: string;
  savedPosts: SavedPost[];
  followers: string[];
  following: string[];
  bio?: string;
  website?: string;
  isDeleted: boolean;
  isOnBoardingComplete: boolean;
  isVerified: boolean;
  isOAuthUser: boolean;
  isTwoFactorEnabled?: boolean;
  accessToken?: AccessToken;
};

export type UserRole = 'user' | 'admin';
export type AccessToken = string;

export type Post = {
  _id: string;
  caption?: string;
  image: string;
  likes: Like[];
  comments: Comment[];
  userId: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  status?: PostStatus;
};

export type PostStatus = 'PUBLIC' | 'PRIVATE';

export type Like = {
  _id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  _id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Following = {
  _id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
  updatedAt: Date;
  following: User;
};

export type Message = {
  _id: string;
  sender: User;
  receiver: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Chat = {
  _id: string;
  users: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
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

export type SavedPost = {
  _id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};
