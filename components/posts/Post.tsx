'use client';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';
import UserAvatar from '@/components/profile/UserAvatar';
import Timestamp from '../Timestamp';
import { Card } from '../ui/card';
import PostOptions from './PostOptions';
import PostActions from './PostActions';
import Comments from '../comments/Comments';
import Link from 'next/link';
import Image from 'next/image';
import { Post as PostType, User } from '@/lib/definitions';

function Post({ post, user }: { post: PostType; user: User }) {
  const { data: session, status } = useSession();
  const currentUser = session?.user as User;
  const cachedUser = user;
  if (!cachedUser) return null;
  const { username } = cachedUser;
  if (status === 'loading') return null;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={cachedUser} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span
                className="text-xs font-medium text-neutral-500
                      dark:text-neutral-400
                    "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            <p className="text-xs font-medium text-black dark:text-white">
              {post.location || 'Lucknow, India'}
            </p>
          </div>
        </div>

        {currentUser && <PostOptions post={post} currentUser={currentUser} />}
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          priority
          sizes="100%"
          src={post.image}
          alt="Post Image"
          fill
          className="object-cover sm:rounded-md"
        />
      </Card>

      <PostActions
        post={post}
        className="px-3 sm:px-0"
        currentUser={currentUser}
      />

      {post.caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      {/* // Comments */}
      {post.comments.length > 0 && (
        <div className="px-3 sm:px-0">
          <p className="text-sm font-semibold text-black dark:text-white">
            <Link href={`/dashboard/posts/${post._id}`}>
              {post.comments.length}{' '}
              {post.comments.length === 1 ? 'Comment' : 'Comments'}
            </Link>
          </p>
        </div>
      )}

      <Comments postId={post._id} comments={post.comments} user={cachedUser} />
    </div>
  );
}

export default Post;
