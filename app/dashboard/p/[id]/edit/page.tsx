import { auth } from '@/auth';
import EditPost from '@/components/posts/EditPost';

import { axiosInstance } from '@/lib/axiosInstance';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

async function EditPostPage({ params: { id } }: Props) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const post = await axiosInstance
    .get(`/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
}

export default EditPostPage;
