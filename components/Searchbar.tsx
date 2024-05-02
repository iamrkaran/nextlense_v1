'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { User } from '@/lib/definitions';
import { axiosInstance } from '@/lib/axiosInstance';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import UserAvatar from './profile/UserAvatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Searchbar({ placeholder }: { placeholder: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(async (term) => {
    const { accessToken } = session?.user as { accessToken: string };

    if (term) {
      try {
        const response = await axiosInstance.get<User[]>(
          `/api/user/search?keyword=${term}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, 300);

  return (
    <div className="relative">
      <div className="relative flex flex-1 flex-shrink-0">
        {/* Search input field */}
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          value={searchTerm}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      {/* List of users */}
      <div className="grid grid-cols-1 gap-4 z-100">
        {users?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded border p-4 px-3 shadow sm:px-0"
          >
            <Link href={`/dashboard/users/${user.username}`} >
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
        ))}
      </div>
    </div>
  );
}
