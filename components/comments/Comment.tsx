'use client';
import CommentOptions from '@/components/comments/CommentOptions';
import UserAvatar from '@/components/profile/UserAvatar';
import Link from 'next/link';
import Timestamp from '../Timestamp';
import { Comment as CommentType, User } from '@/lib/definitions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axiosInstance';

type Props = {
  comment: CommentType;
  inputRef?: React.RefObject<HTMLInputElement>;
};

function Comment({ comment, inputRef }: Props) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const currentUser = user?._id;
  const userId = comment.userId;
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) return;
      const { accessToken } = session?.user as { accessToken: string };
      const res = await axiosInstance.get<User>(`/api/user?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo(res.data);
    };

    fetchUserData();
  }, [userId, session?.user]);

  if (!user) return null;

  const username = userInfo?.username;
  const href = `/dashboard/${username}`;
 
  return (
    <div className="group flex items-start  space-x-2.5 p-3 px-3.5">
      <Link href={href}>
        <UserAvatar user={userInfo} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{comment.content}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={comment.createdAt} />
          <button
            className="text-xs font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Reply
          </button>
          {currentUser && currentUser === comment.userId && (
            <CommentOptions comment={comment} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
