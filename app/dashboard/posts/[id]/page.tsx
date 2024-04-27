import { auth } from '@/auth';
import PostView from '@/components/posts/PostView';
import { axiosInstance } from '@/lib/axiosInstance';
import { Post } from '@/lib/definitions';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

async function PostModal({ params: { id } }: Props) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };

  const res = await axiosInstance.get<Post>(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const post = res.data;

  if (!post) {
    notFound();
  }
  return <PostView id={id} post={post} />;
}

export default PostModal; 

