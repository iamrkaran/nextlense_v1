import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { User } from '@/lib/definitions'; // replace with your actual User model import
import UserAvatar from './profile/UserAvatar'; // replace with your actual UserAvatar component import
import Link from 'next/link'; // replace with your actual Link component import
import { useRouter } from 'next/navigation'; // replace with your actual useRouter hook import

interface SearchResultsProps {
  users: User[];
  children: React.ReactNode;
}

const SearchResults: React.FC<SearchResultsProps> = ({ users, children }) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dialogContent">
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
        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SearchResults;
