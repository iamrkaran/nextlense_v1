'use client';

import CommentForm from '@/components/comments/CommentForm';
import PostActions from './PostActions';
import UserAvatar from '@/components/profile/UserAvatar';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import useMount from '@/hooks/useMount';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Comment from '../comments/Comment';
import { Post, User } from '@/lib/definitions';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';
import PostOptions from './PostOptions';

function PostView({ id, post }: { id: string; post: Post }) {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      const { accessToken } = session?.user as { accessToken: string };
      if (!session?.user) return;
      const res = await axiosInstance.get<User>(
        `/api/user?userId=${post.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setUser(res.data);
    };

    fetchUserData();
  }, [post.userId, session?.user]);

  const username = user?.username;
  const href = `/dashboard/${username}`;
  const mount = useMount();

  if (!mount) return null;

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex h-full max-h-[500px] flex-col items-start gap-0 p-0 md:max-w-3xl md:flex-row lg:max-h-[700px] lg:max-w-5xl xl:max-h-[800px] xl:max-w-6xl">
        <div className="flex w-full max-w-md flex-col justify-between md:order-2 md:h-full">
          <DialogHeader className="flex flex-row items-center space-x-2.5 space-y-0 border-b py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={user} />
            </Link>
            <Link href={href} className="text-sm font-semibold">
              {username}
            </Link>
            <PostOptions
              post={post}
              className="ml-[50px]  font-extralight text-red-500 dark:text-red-400"
            />
          </DialogHeader>

          <ScrollArea className="hidden flex-1 border-b py-1.5 md:inline">
            {post.comments.length > 0 && (
              <>
                {post.comments.map((comment) => {
                  return (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      inputRef={inputRef}
                    />
                  );
                })}
              </>
            )}
          </ScrollArea>

          <div className="mt-auto hidden border-b p-2.5 px-2 md:block">
            <PostActions post={post} />
            <time className="text-[11px]  font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <CommentForm
            postId={id}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          />
        </div>

        <div className="relative h-96 w-full max-w-3xl overflow-hidden md:h-[500px] lg:h-[700px] xl:h-[800px]">
          <Image
            src={post.image}
            fill
            objectFit="cover"
            alt="Post Image"
            className="object-cover md:rounded-l-md"
          />
        </div>

        <PostActions
          post={post}
          className="border-b p-2.5 md:hidden"
        />
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
      </DialogContent>
    </Dialog>
  );
}

export default PostView;
