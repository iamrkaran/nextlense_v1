'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axiosInstance';
import { Post } from '@/lib/definitions';
import { fetchUser } from '@/lib/data';

type Props = {
  accessToken: string;
};

const Explore: React.FC<Props> = ({ accessToken }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts/recommendations', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [accessToken]);

  const userCache: { [userId: string]: string } = useMemo(() => ({}), []);

  const fetchUserData = async (userId: string) => {
    // Check if user data is already cached
    if (userCache[userId]) {
      return userCache[userId];
    }
    try {
      const userResponse = await fetchUser(userId, accessToken);
      const user = userResponse;
      userCache[userId] = user.username;
      return user.username;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return '';
    }
  };

  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {shuffledPosts.map((post) => (
          <div
            key={post._id}
            className="overflow-hidden rounded-lg border border-gray-300"
          >
            <Image
              priority
              width={256}
              height={256}
              src={post.image}
              alt={post?.caption || 'Post image'}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 text-lg font-semibold">{post.caption}</h2>
              <p
                className="cursor-pointer text-blue-600 hover:text-blue-900"
                onClick={async () => {
                  const username = await fetchUserData(post.userId);
                  router.push(`/dashboard/users/${username}`);
                }}
              >
                <span>@{userCache[post.userId] || fetchUserData(post.userId)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
