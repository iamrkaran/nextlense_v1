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
};

function PostOptions({ post, className }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;
  const isPostMine = post.userId === user._id;

  const deletePost = async (formData: FormData) => {
    const { accessToken } = session?.user as { accessToken: string };
    const postId = formData.get('id');
    await axiosInstance.delete(`/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide comments</button>
        </form>
        <form action="" className="postOption border-0">
          <button className="w-full bg-red-600 p-3 text-white">
            Report Post
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
