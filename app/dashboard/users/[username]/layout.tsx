import { auth } from '@/auth';
import FollowButton from '@/components/follow/FollowButton';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import UserAvatar from '@/components/profile/UserAvatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { axiosInstance } from '@/lib/axiosInstance';
import { User } from '@/lib/definitions';
import { MoreHorizontal, Settings } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function GenerateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username;
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const profile = await axiosInstance
    .get(`/api/user/username?username=${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    title: `${profile?.firstName} -(@${profile?.username})`,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };

  const response = await axiosInstance.get<User>(
    `/api/user/username?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const profile = response.data;

  const userLogged = session?.user as User;

  const isCurrentUser = userLogged?._id === profile?._id;
  const isFollowing = profile?.followers.includes(userLogged?._id);

  if (!profile) {
    notFound();
  }
  return (
    <>
      <ProfileHeader username={profile.username} />
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-x-5 px-4 md:gap-x-10">
          <ProfileAvatar user={profile}>
            <UserAvatar
              user={profile}
              className="h-20 w-20 cursor-pointer md:h-36 md:w-36"
            />
          </ProfileAvatar>

          <div className="space-y-4 md:px-10">
            <div className="grid grid-cols-2 items-center gap-3 md:grid-cols-4">
              <p className="text-xl font-semibold">{profile.username}</p>
              {isCurrentUser ? (
                <>
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                    className="md:order-last"
                  >
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: '!font-bold',
                      variant: 'secondary',
                      size: 'sm',
                    })}
                  >
                    Edit profile
                  </Link>
                  <Button
                    variant={'secondary'}
                    className="font-bold"
                    size={'sm'}
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>
                  <FollowButton
                    isFollowing={isFollowing}
                    profileId={profile._id}
                  />
                  <Button
                    variant={'secondary'}
                    className="font-bold"
                    size={'sm'}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <Link
                href={`/dashboard/users/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followers.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/users/${profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="text-xl font-bold ">
                {profile?.firstName && (
                  <>
                    <Label className='text-xl text-left'>Name </Label>
                    <span className="dark:text-green-500 ">
                      {profile?.firstName} {profile.lastName}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-2 ">
                <Label className='text-xl text-left'>Email </Label>
                <span className="dark:text-green-500">{profile?.email}</span>
              </div>
              <div className="mt-2 ">
                <Label className='text-xl text-left'>Website </Label>
                {profile?.website && (
                  <>
                    <Link
                      href={profile?.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="dark:text-green-500 text-blue-700">{profile?.website}</span>
                    </Link>
                  </>
                )}
              </div>
              <p className="mt-4">
                <Label className='text-xl text-left'>Bio </Label>
                <span className="dark:text-green-500">{profile?.bio}</span>
              </p>
            </div>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />

        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
