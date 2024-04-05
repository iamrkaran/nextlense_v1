'use client';
import SubmitButton from '../SubmitButton';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { axiosInstance } from '@/lib/axiosInstance';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

function FollowButton({
  profileId,
  isFollowing,
  className,
  buttonClassName,
}: {
  profileId: string;
  isFollowing?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  const { data: session } = useSession();
  const followUser = async (formData: FormData) => {
    const { accessToken } = session?.user as { accessToken: string };
    const id = formData.get('id');
    await axiosInstance.post(
      `/api/user/follow?userId=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    toast.success(isFollowing ? 'Unfollowed' : 'Followed');
  };

  return (
    <form action={followUser} className={className}>
      <input type="hidden" value={profileId} name="id" />
      <SubmitButton
        className={buttonVariants({
          variant: isFollowing ? 'secondary' : 'default',
          className: cn('w-full !font-bold', buttonClassName),
          size: 'sm',
        })}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </SubmitButton>
    </form>
  );
}

export default FollowButton;

