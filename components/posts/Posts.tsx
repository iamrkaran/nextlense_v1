'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Post from './Post';
import { axiosInstance } from '@/lib/axiosInstance';
import { Post as PostType, User } from '@/lib/definitions';

import { fetchUser } from '@/lib/data';

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostType[]>([]);
  //reverse the order of the posts

  const [userData, setUserData] = useState<Map<string, User>>(new Map());

  useEffect(() => {
    const fetchPosts = async () => {
      if (session) {
        const { accessToken } = session.user as { accessToken: string };
        try {
          const res = await axiosInstance.get<PostType[]>('/api/posts', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          // Sort posts in reverse chronological order
          const sortedPosts = res.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setPosts(sortedPosts);

          // Create a new map for user data
          const newUserData = new Map<string, User>();

          // Fetch user data for each post
          for (const post of sortedPosts) {
            if (!newUserData.has(post.userId)) {
              const user = await fetchUser(post.userId, accessToken);
              newUserData.set(post.userId, user);
            }
          }

          setUserData(newUserData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPosts();
  }, [session]);

  //reverse the order of the posts
  const reversePosts = posts.reverse();

  return (
    <>
      {reversePosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          user={userData.get(post.userId) || ({} as User)}
        />
      ))}
    </>
  );
}

export default Posts;
