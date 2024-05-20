"use client"
import UserAvatar from '@/components/profile/UserAvatar';
import Searchbar from '@/components/Searchbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/definitions';
import { useSession } from 'next-auth/react';

export const Search = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <div>
      <Searchbar placeholder="" />
      <div className="z-100 grid grid-cols-1 gap-4 m-16 p-16">
        <div className="flex items-center justify-between rounded border p-4 px-3 shadow sm:px-0">
          <Link href={`/dashboard/users/${user.username}`}>
            <div
              className="pointer-events-auto flex items-center space-x-3 p-2"
              onClick={() => router.push(`/dashboard/users/${user.username}`)}
            >
              <UserAvatar user={user} />
              <div className="text-sm">
                <p className="space-x-1">
                  <span className="font-semibold">@{user.username}</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
