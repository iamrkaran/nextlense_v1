'use client';
import { Like, Post } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import ActionIcon from '../ActionIcon';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';
import { useState } from 'react';

function LikeButton({ post, userId }: { post: Post; userId?: string }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes);

  const likePost = async (postId: string) => {
    const { accessToken } = session?.user as { accessToken: string };
    await axiosInstance.post(
      `/api/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  const predicate = (like: Like) => like.userId;

  const handleClick = async () => {
    if (!session?.user) return;
    const postId = post._id;
    await likePost(postId);
    setLikes([...likes]);
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleClick}>
        <ActionIcon>
          <Heart
            className={cn('h-6 w-6', {
              'fill-red-500 text-red-500': likes.some(predicate),
            })}
          />
        </ActionIcon>
      </button>
      {likes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </p>
      )}
    </div>
  );
}

export default LikeButton;
