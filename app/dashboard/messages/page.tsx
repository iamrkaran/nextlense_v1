'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/axiosInstance';
import { User } from '@/lib/definitions';
import { send } from 'process';

const socket = io('ws://localhost:3001');

export type Message = {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
};

const Messages = () => {
  const { data: session } = useSession();
  const [currentChatUser, setCurrentChatUser] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[] | null>(null);
  const user = session?.user as User;
  const accessToken = user?.accessToken as string;
  console.log('messages:', messages);
  useEffect(() => {
    if (session) {
      axiosInstance
        .get('/api/user/search?keyword=admin', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
     // Listen for 'message' events from the server
     socket.on('message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the effect
    return () => {
      socket.disconnect();
    };
  }, [session, accessToken]);

  const sendMessage = () => {
    if (currentChatUser && message) {
      socket.emit('message', {
        sender: user?._id,
        receiver: currentChatUser,
        content: message,
      });
      console.log('Message sent:', message, currentChatUser, user?._id);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        {users &&
          users.map((user) => (
            <div key={user._id} onClick={() => setCurrentChatUser(user._id)}>
              {user.username}
            </div>
          ))}
      </div>
      <div style={{ flex: 3 }}>
        {currentChatUser && (
          <div>
            <div>
              {messages.map((message) => (
                <div key={message._id}>
                  {message.sender === user._id ? 'You' : message.sender}:
                  {message.content}
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {!currentChatUser && <div>Select a user to chat with</div>}

        <div>
          <button onClick={() => socket.emit('getMessages', user?._id)}>
            Get Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
