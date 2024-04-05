import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostsGrid from './PostsGrid';
import { axiosInstance } from '@/lib/axiosInstance';
import { auth } from '@/auth';
import { Post, User } from '@/lib/definitions';

async function MorePosts({ postId }: { postId: string }) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const post = await axiosInstance
    .get<Post>(`/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch(notFound);

  //fetch user from post.userId
  const user = await axiosInstance
    .get<User>(`/api/users/${post.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((user) => user.data)
    .catch(notFound);

  const postUsername = user.username;

  // fetch posts by username
  const posts = await axiosInstance
    .get<Post[]>(`/api/posts/user/${postUsername}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((posts) => posts.data)
    .catch(notFound);
  if (!post) return null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-3 pb-20 lg:max-w-4xl">
      <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
        More posts from{' '}
        <Link
          href={`/dashboard/${postUsername}`}
          className="text-black hover:opacity-50 dark:text-white"
        >
          {postUsername}
        </Link>{' '}
      </p>

      <PostsGrid posts={posts} />
    </div>
  );
}

export default MorePosts;
