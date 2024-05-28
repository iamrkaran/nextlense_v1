import { z } from 'zod';

const UserRole = z.enum(['user', 'admin']);

const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: UserRole,
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePicture: z.string().optional(),
  coverPicture: z.string().optional(),
  savedPosts: z.array(z.string()),
  followers: z.array(z.string()),
  following: z.array(z.string()),
  bio: z.string().optional(),
  website: z.string().optional(),
  isDeleted: z.boolean(),
  isOnBoardingComplete: z.boolean(),
  isVerified: z.boolean(),
  isOAuthUser: z.boolean(),
  isTwoFactorEnabled: z.boolean().optional(),
  accessToken: z.string().optional(),
  captionLanguage: z.string().optional(),
});

const UserUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  captionLanguage: z.string().optional(),
});

const PostStatus = z.enum(['PUBLIC', 'PRIVATE']);

const LikeSchema = z.object({
  _id: z.string(),
  user: UserSchema,
  post: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CommentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  user: UserSchema,
  post: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const PostSchema = z.object({
  _id: z.string(),
  caption: z.string().optional(),
  image: z.string(),
  likes: z.array(LikeSchema),
  comments: z.array(CommentSchema),
  user: UserSchema,
  location: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isLiked: z.boolean().optional(),
  status: PostStatus.optional(),
});

const CreatePost = z.object({
  caption: z.string().optional(),
  location: z.string().optional(),
  status: PostStatus.optional(),
});

const FollowingSchema = z.object({
  _id: z.string(),
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  following: UserSchema,
});

const MessageSchema = z.object({
  _id: z.string(),
  sender: UserSchema,
  receiver: UserSchema,
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const ChatSchema = z.object({
  _id: z.string(),
  users: z.array(UserSchema),
  messages: z.array(MessageSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const UpdatePost = z.object({
  _id: z.string().optional(),
  caption: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  likes: z.array(LikeSchema).optional(),
  comments: z.array(CommentSchema).optional(),
  user: UserSchema.optional(),
  location: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isLiked: z.boolean().optional(),
  status: PostStatus.optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const RegisterSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export {
  UserSchema,
  PostSchema,
  FollowingSchema,
  MessageSchema,
  ChatSchema,
  UpdatePost,
  UserUpdateSchema,
  LoginSchema,
  RegisterSchema,
  CreatePost,
};
