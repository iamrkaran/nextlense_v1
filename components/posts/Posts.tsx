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
          setPosts(res.data);

          // Create a new map for user data
          const newUserData = new Map<string, User>();

          // Fetch user data for each post
          for (const post of res.data) {
            if (!newUserData.has(post.userId)) {
              const user = await fetchUser(post.userId, accessToken);
              newUserData.set(post.userId, user);
            }
          }

          // Update state with new user data
          setUserData(newUserData);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchPosts();
  }, [session]);

  return (
    <>
      {posts.map((post) => (
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