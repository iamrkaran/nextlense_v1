import { Avatar } from '@/components/ui/avatar';
import { User } from '@/lib/definitions';

import type { AvatarProps } from '@radix-ui/react-avatar';

import Image from 'next/image';

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        priority
        sizes="100%"
        src={user?.profilePicture || '/images/placeholder.jpg'}
        fill
        alt={`${user?.firstName}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default UserAvatar;
