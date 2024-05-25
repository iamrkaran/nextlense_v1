import React from 'react';
import Contacts from '@/components/messages/Contacts';
import ChatLayout from '@/components/messages/ChatLayout';

const Chats: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <ChatLayout />
    </div>
  );
};

export default Chats;
