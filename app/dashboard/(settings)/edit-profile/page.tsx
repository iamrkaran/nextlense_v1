import { auth } from '@/auth';
import ProfileForm from '@/components/profile/ProfileForm';
import { axiosInstance } from '@/lib/axiosInstance';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit profile',
  description: 'Edit profile',
};

async function EditProfile() {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  const profile = await axiosInstance
    .get(`/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
