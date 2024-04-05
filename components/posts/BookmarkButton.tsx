'use client';
import { cn } from '@/lib/utils';
import ActionIcon from '@/components/ActionIcon';
import { Bookmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Post, SavedPost } from '@/lib/definitions';
import { axiosInstance } from '@/lib/axiosInstance';
import { useState } from 'react';

type Props = {
  post: Post;
  userId?: string;
};

function BookmarkButton({ post, userId }: Props) {
  const { data: session } = useSession();
  const user = session?.user as { savedPosts?: SavedPost[] };
  const [isBookmarked, setIsBookmarked] = useState(user?.savedPosts?.some((bookmark: SavedPost) => bookmark.postId === post._id) ?? false);

  const toggleBookmark = async (postId: string) => {
    if (!session?.user) return;
    const { accessToken } = session?.user as { accessToken: string };
    const method = isBookmarked ? 'delete' : 'post';
    await axiosInstance[method](`/api/posts/save/${postId}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setIsBookmarked(!isBookmarked);
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await toggleBookmark(post._id);
      }} 
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post._id} />
      <ActionIcon>
        <Bookmark
          className={cn('h-6 w-6', {
            'fill-red-500 dark:fill-white': isBookmarked,
            'fill-black dark:fill-white': !isBookmarked,
          })}
        />
      </ActionIcon>
    </form>
  );
}

export default BookmarkButton;
