import { auth } from '@/auth';
import PostsGrid from '@/components/posts/PostsGrid';
import { axiosInstance } from '@/lib/axiosInstance';
import { Post, SavedPost } from '@/lib/definitions';

async function SavedPosts({
  params: { username },
}: {
  params: { username: string };
}) {
  const session = await auth();

  const { accessToken } = session?.user as { accessToken: string };

  // Fetch all saved posts
  const fetchSavedPosts = await axiosInstance.get<SavedPost[]>(`/api/bookmarks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Extract post IDs from saved posts
  const postIds = fetchSavedPosts?.data.map((post) => post.postId);

  // Fetch posts by post IDs
  const postsByPostId = await Promise.all(
    postIds.map((postId) =>
      axiosInstance.get<Post>(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ),
  );

  // Extract post data
  const posts = postsByPostId.map((response) => response.data);

  return <PostsGrid posts={posts} />;
}

export default SavedPosts;
