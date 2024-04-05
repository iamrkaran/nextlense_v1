'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/SubmitButton';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Comment } from '@/lib/definitions';

import { axiosInstance } from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';

type Props = {
  comment: Comment;
};

function CommentOptions({ comment }: Props) {
  const { data: session } = useSession();
  const deleteComment = async (formData: FormData) => {
    const { accessToken } = session?.user as { accessToken: string };
    const commentId = formData.get('id');
    await axiosInstance.delete(`/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="hidden h-5 w-5 cursor-pointer group-hover:inline dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        <form
          action={async (formData) => {
            await deleteComment(formData);
            toast.success('Comment deleted');
          }}
          className="postOption"
        >
          <input type="hidden" name="id" value={comment._id} />
          <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
            Delete
          </SubmitButton>
        </form>

        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default CommentOptions;
