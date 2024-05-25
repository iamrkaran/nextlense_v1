'use client';

import React, { useEffect, useState } from 'react';
import { axiosInstance, setAuthToken } from '@/lib/axiosInstance';
import Pusher from 'pusher-js';
import { User } from '@/lib/definitions';
import UserAvatar from '../profile/UserAvatar';
import { useSession } from 'next-auth/react';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Message {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
}

interface Chat {
  _id: string;
  messages: Message[];
  participants: User[];
}
const CreateMessage = z.object({
  message: z.string().nonempty(),
});

const ChatWindow = ({ user }: { user: User }) => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const form = useForm<z.infer<typeof CreateMessage>>({
    resolver: zodResolver(CreateMessage),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (currentUser?.accessToken) {
      setAuthToken(currentUser.accessToken as string);
    }

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/api/chats/${user._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string;
    const pusher = new Pusher(pusherKey, {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe(`chat_${user._id}`);
    channel.bind('new_message', (data: Message) => {
      setMessages(
        messages.map((chat) => {
          if (chat._id === data._id) {
            return {
              ...chat,
              messages: [...chat.messages, data],
            };
          }
          return chat;
        })
      );
    });

    return () => {
      pusher.unsubscribe(`chat_${user._id}`);
    };
  }, [currentUser.accessToken, user._id, messages]);

  const sendMessage = async (values: z.infer<typeof CreateMessage>) => {
    try {
      await axiosInstance.post(`/api/chats`, {
        message: values.message,
        senderId: currentUser._id,
        receiverId: user._id,
      });

      const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string;
      const pusher = new Pusher(pusherKey, {
        cluster: 'ap2',
      });

      const channel = pusher.subscribe(`chat_${user._id}`);
      channel.trigger('client-new_message', {
        _id: Math.random().toString(36).substr(2, 9),
        message: values.message,
        senderId: currentUser._id,
        receiverId: user._id,
      });

      form.reset();

      setNewMessage('');
    } catch (error: any) {
      return error.response.data;
    }
  };


  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-blue-600 p-4 text-black">
        <h2 className="text-xl font-bold">{user.username}</h2>
        <UserAvatar user={user} />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((chat) => (
          <div key={chat._id} className="space-y-2">
            {chat.messages.map((message) => (
              <div
                key={message._id}
                className={`${
                  message.senderId === currentUser._id
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }`}
              >
                <div
                  className={`${
                    message.senderId === currentUser._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-black'
                  } p-2 rounded-md`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 bg-white p-4">
        <form
          onSubmit={form.handleSubmit(sendMessage)}
          className="w-full space-y-4"
        >
          <div className="flex w-full">
            <input
              type="text"
              id="message"
              placeholder="Enter your message..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              {...form.register('message')}
            />
            <button
              type="submit"
              className="ml-2 rounded-md bg-blue-600 px-4 py-2 text-white"
            >
              Send
            </button>
            <button
              onClick={() => form.reset()}
              className="ml-2 rounded-md bg-red-600 px-4 py-2 text-white"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
