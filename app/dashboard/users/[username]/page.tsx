import { auth } from '@/auth';
import PostsGrid from '@/components/posts/PostsGrid';

import { axiosInstance } from '@/lib/axiosInstance';
import { Post } from '@/lib/definitions';

async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const fetchPosts = await axiosInstance.get<Post[]>(
    `/api/posts/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const posts = fetchPosts.data;

  return <PostsGrid posts={posts} />;
}

export default ProfilePage;
