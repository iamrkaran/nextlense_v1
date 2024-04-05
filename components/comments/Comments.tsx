'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Comment, User } from '@/lib/definitions';
import { axiosInstance } from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';

// Define the schema for the form
const CreateComment = z.object({
  content: z.string(),
  postId: z.string(),
});

function Comments({
  postId,
  comments,
  user,
}: {
  postId: string;
  comments: Comment[];
  user?: User | null;
}) {
  const { data: session } = useSession();

  const createComment = async (formData: z.infer<typeof CreateComment>) => {
    const { accessToken } = session?.user as { accessToken: string };
    await axiosInstance.post(`/api/comments`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      content: '',
      postId,
    },
  });

  const content = form.watch('content');

  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            form.reset();
            await createComment(values);
          })}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {content.trim().length > 0 && (
            <button
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default Comments;
