import { auth } from '@/auth';
import FollowingModal from '@/components/follow/FollowingModal';
import { axiosInstance } from '@/lib/axiosInstance';

async function FollowingPage({
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
  const following = profile?.following;

  return <FollowingModal following={following} username={username} />;
}

export default FollowingPage;
