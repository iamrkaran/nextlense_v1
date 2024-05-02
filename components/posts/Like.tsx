'use client';
import { Like, Post, User } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import ActionIcon from '../ActionIcon';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';
import { useState } from 'react';

function LikeButton({ post, userId }: { post: Post; userId?: string }) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const [likes, setLikes] = useState(post.likes);

  const likePost = async (postId: string) => {
    const accessToken = user?.accessToken;
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

    // Check if the user has already liked the post
    const userHasLiked = likes.some((like) => like.userId === user._id);

    if (userHasLiked) {
      // If the user has already liked the post, send a DELETE request to unlike the post
      try {
        await axiosInstance.delete(`/api/like/${postId}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });

        // Optimistically update the likes state
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.userId !== user._id),
        );
      } catch (error) {
        // If the request fails, revert the likes state
        setLikes((prevLikes) => [
          ...prevLikes,
          {
            userId: user._id,
            postId,
            _id: 'tempId',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    } else {
      // If the user has not liked the post, send a POST request to like the post
      try {
        await axiosInstance.post(
          `/api/like/${postId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        );

        // Optimistically update the likes state
        setLikes((prevLikes) => [
          ...prevLikes,
          {
            userId: user._id,
            postId,
            _id: 'tempId',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      } catch (error) {
        // If the request fails, revert the likes state
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like._id !== 'tempId'),
        );
      }
    }
  };

  return (
    <div className="flex flex-col">
      <ActionIcon onClick={handleClick}>
        <Heart
          className={cn('h-6 w-6', {
            'fill-red-500 text-red-500': likes.some(predicate),
          })}
        />
      </ActionIcon>

      {likes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </p>
      )}
    </div>
  );
}

export default LikeButton;
