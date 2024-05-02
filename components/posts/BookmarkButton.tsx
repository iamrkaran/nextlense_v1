'use client';
import { cn } from '@/lib/utils';
import ActionIcon from '@/components/ActionIcon';
import { Bookmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Post, SavedPost, User } from '@/lib/definitions';
import { axiosInstance } from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

type Props = {
  post: Post;
  userId?: string;
};

function BookmarkButton({ post, userId }: Props) {
  const { data: session } = useSession();
  const user = session?.user as User;

  const [isBookmarked, setIsBookmarked] = useState(false);

  // fetch all bookmark
  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data } = await axiosInstance.get<SavedPost[]>('/api/bookmarks', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const bookmarkedPostIds = data.map((bookmark) => bookmark.postId);
      setIsBookmarked(bookmarkedPostIds.includes(post._id));
    };

    if (user) {
      fetchBookmarks();
    }
  }, [user, post._id]);

  const handleClick = async (postId: string) => {
    if (isBookmarked) {
      // Delete the bookmark
      await axiosInstance.delete(`/api/bookmarks/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    } else {
      // Create a new bookmark
      await axiosInstance.post(
        `/api/bookmarks/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      );
    }

    // Update the state
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ActionIcon onClick={() => handleClick(post._id)} className="ml-auto">
      <Bookmark
        className={cn('h-6 w-6', {
          'fill-gray-900 dark:fill-white': isBookmarked,
          'stroke-black dark:stroke-white': !isBookmarked,
        })}
      />
    </ActionIcon>
  );
}

export default BookmarkButton;
