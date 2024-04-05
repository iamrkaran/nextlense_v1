import Link from "next/link";
import FollowButton from "./FollowButton";
import UserAvatar from "../profile/UserAvatar";
import { useSession } from 'next-auth/react';
import { Following as FollowingType, User } from "@/lib/definitions";

function Following({ following }: { following: FollowingType }) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const isCurrentUser = user?._id === following.following._id;

  if (!user || isCurrentUser) return null;

  return (
    <div className="p-4 flex items-center justify-between gap-x-3">
      <Link href={`/dashboard/${following.following.username}`}>
        <a className="flex items-center gap-x-3">
          <UserAvatar user={following.following} className="h-10 w-10" />
          <p className="font-bold text-sm">{following.following.username}</p>
        </a>
      </Link>
      <FollowButton
        profileId={following.following._id}
        buttonClassName="bg-neutral-700 dark:hover:bg-neutral-700/40"
      />
    </div>
  );
}

export default Following;
