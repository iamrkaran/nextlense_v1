'use client';
import { cn } from '@/lib/utils';
import ActionIcon from '@/components/ActionIcon';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { Post, User } from '@/lib/definitions';
import LikeButton from './Like';
import ShareButton from './ShareButton';
import { useSession } from 'next-auth/react';

type Props = {
  post: Post;
  className?: string;
  currentUser: User;
};

function PostActions({ post, className, currentUser }: Props) {
  const userId = currentUser?._id;
  return (
    <div className={cn('relative flex w-full items-start gap-x-2', className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/posts/${post._id}`}>
        <ActionIcon>
          <MessageCircle className={'h-6 w-6'} />
        </ActionIcon>
      </Link>
      <ShareButton postId={post._id} />
      <BookmarkButton post={post} userId={userId}  />
    </div>
  );
}

export default PostActions;
