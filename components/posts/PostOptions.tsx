'use client';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SubmitButton from '@/components/SubmitButton';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { axiosInstance } from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import { Post, User } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

type Props = {
  post: Post;
  className?: string;
  currentUser: User;
};

function PostOptions({ post, className, currentUser }: Props) {
  const router = useRouter();
  const isPostMine = post.userId === currentUser?._id;
  const { data: session, status } = useSession();

  const user = session?.user as User;

  const deletePost = async (formData: FormData) => {
    const { accessToken } = user;
    const postId = formData.get('id');
    await axiosInstance.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  //handleClick function

  const handleClick = async (
    message: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    toast.success(message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            'h-5 w-5 cursor-pointer dark:text-neutral-400',
            className,
          )}
        />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        {isPostMine && (
          <form
            action={async (formData) => {
              if (
                window.confirm('Are you sure you want to delete this post?')
              ) {
                await deletePost(formData);
                router.push('/dashboard');
                toast.success('Post deleted');
              }
            }}
            className="postOption"
          >
            <input type="hidden" name="id" value={post._id} />
            <SubmitButton
              type="submit"
              className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed"
            >
              Delete post
            </SubmitButton>
          </form>
        )}

        {isPostMine && (
          <Link
            scroll={false}
            href={`/dashboard/p/${post._id}/edit`}
            className="postOption p-3"
          >
            Edit
          </Link>
        )}

        <form className="postOption border-0">
          <button
            onClick={(event) => handleClick('Like count hidden', event)}
            className="w-full p-3"
          >
            Hide like count
          </button>
        </form>
        <form className="postOption border-0">
          <button
            onClick={(event) => handleClick('Comments hidden', event)}
            className="w-full p-3"
          >
            Hide comments
          </button>
        </form>
        <form className="postOption border-0">
          <button
            onClick={(event) => handleClick('Post reported', event)}
            className="w-full bg-red-600 p-3 text-white"
          >
            Report Post
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
