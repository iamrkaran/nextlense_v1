import { auth } from '@/auth';
import FollowersModal from '@/components/follow/FollowersModal';
import { axiosInstance } from '@/lib/axiosInstance';

async function FollowersPage({
  params: { username },
}: {
  params: {
    username: string;
  };
}) {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const profile = await axiosInstance
    .get(`/api/user/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const followers = profile?.followers;

  return <FollowersModal followers={followers} username={username} />;
}

export default FollowersPage;
