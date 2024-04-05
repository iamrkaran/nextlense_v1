import Link from 'next/link';
import FollowButton from './FollowButton';
import UserAvatar from '../profile/UserAvatar';
import { useSession } from 'next-auth/react';
import { Following as FollowingType, User } from '@/lib/definitions';

function Follower({ follower }: { follower: FollowingType }) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const isCurrentUser = user?._id === follower.followerId;

  if (!user || isCurrentUser) return null;

  return (
    <div className="flex items-center justify-between gap-x-3 p-4">
      <Link href={`/dashboard/${follower.following.username}`}>
        <a className="flex items-center gap-x-3">
          <UserAvatar user={follower.following} className="h-10 w-10" />
          <p className="text-sm font-bold">{follower.following.username}</p>
        </a>
      </Link>
      <FollowButton
        profileId={follower.following._id}
        buttonClassName="bg-neutral-700 dark:hover:bg-neutral-700/40"
      />
    </div>
  );
}

export default Follower;
