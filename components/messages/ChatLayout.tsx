'use client';
import React, { useState } from 'react';
import Contacts from './Contacts';
import UserAvatar from '@/components/profile/UserAvatar';
import { User } from '@/lib/definitions';
import ChatWindow from './ChatWindow';

const ChatLayout: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="relative z-[9999] flex h-screen flex-col bg-gray-100 p-2 md:flex-row md:overflow-hidden">
      {/* User List */}
      <div className="w-full overflow-y-auto border-r border-gray-300 bg-white p-4 md:w-1/4">
        <Contacts onSelectUser={handleUserSelect} />
      </div>

      {/* Chat Window */}
      <div className="flex-1 ">
        {selectedUser && <ChatWindow user={selectedUser} />}
      </div>
    </div>
  );
};

export default ChatLayout;
