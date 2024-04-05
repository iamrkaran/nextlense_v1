import { auth } from '@/auth';
import PostsGrid from '@/components/posts/PostsGrid';
import { axiosInstance } from '@/lib/axiosInstance';
import { Post } from '@/lib/definitions';

async function SavedPosts({
  params: { username },
}: {
  params: { username: string };
}) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const fetchSavedPosts = await axiosInstance.get<Post[]>(
    `/api/posts/saved/user/${username}
  `,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const posts = fetchSavedPosts?.data;

  return <PostsGrid posts={posts} />;
}

export default SavedPosts;
