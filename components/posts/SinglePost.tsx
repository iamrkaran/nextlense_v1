import Comment from '@/components/comments/Comment';
import CommentForm from '@/components/comments/CommentForm';
import Post from '@/components/posts/Post';

import PostOptions from '@/components/posts/PostOptions';
import UserAvatar from '@/components/profile/UserAvatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '../ui/card';
import MiniPost from './MiniPost';

import { axiosInstance } from '@/lib/axiosInstance';
import { auth } from '@/auth';
import { Post as PostType, User } from '@/lib/definitions';
import PostActions from './PostActions';

async function SinglePost({ id }: { id: string }) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };

  const res = await axiosInstance.get<PostType>(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const post = res.data;

  //fetch user by id

  const userRes = await axiosInstance.get<User>(
    `/api/user?userId=${post?.userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const user = userRes.data;

  const postUsername = user?.username;
  const userId = user?._id;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
        <div className="relative h-[450px] w-full max-w-sm overflow-hidden lg:max-w-lg">
          <Image
            src={post.image || '/images/placeholder.jpg'}
            alt="Post preview"
            fill
            className="object-cover md:rounded-l-md"
          />
        </div>

        <div className="flex max-w-sm flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="text-sm font-semibold"
                  href={`/dashboard/${postUsername}`}
                >
                  {postUsername}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {user?.bio || 'No bio'}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOptions post={post} currentUser={session?.user as User} />
          </div>

          {post.comments.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
              <p className="text-xl font-extrabold lg:text-2xl">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}

          {post.comments.length > 0 && (
            <ScrollArea className="hidden flex-1 py-1.5 md:inline">
              <MiniPost post={post} user={user} />
              {post.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </ScrollArea>
          )}

          <div className="mt-auto hidden border-y p-2.5 px-2 md:block">
            <PostActions post={post} currentUser={session?.user as User} />
            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>
      </Card>
      <div className="md:hidden">
        <Post post={post} user={user} />
      </div>
    </>
  );
}

export default SinglePost;
