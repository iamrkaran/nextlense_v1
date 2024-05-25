'use client';
import React, { useEffect, useState } from 'react';
import { setAuthToken, axiosInstance } from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import UserAvatar from '@/components/profile/UserAvatar';
import { User } from '@/lib/definitions';

interface ContactsProps {
  onSelectUser: (user: User) => void;
}

const Contacts: React.FC<ContactsProps> = ({ onSelectUser }) => {
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      setAuthToken(currentUser.accessToken as string);
    }

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/search?keyword=${searchTerm}`,
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [session, searchTerm, currentUser.accessToken]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="cursor-pointer rounded bg-white p-2 shadow hover:bg-gray-200"
            onClick={() => onSelectUser(user)}
          >
           
            <div
              className="pointer-events-auto flex items-center space-x-3 p-2"     
            >
              <UserAvatar user={user} />
              <div className="text-sm">
                <p className="space-x-1">
                  <span className="font-semibold text-blue-500">@{user.username}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
