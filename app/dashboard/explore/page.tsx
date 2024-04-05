import { auth } from '@/auth';
import Explore from '@/components/explore/Explore';
import React from 'react';

async function ExplorePage() {
  const session = await auth();
  const { accessToken } = session?.user as { accessToken: string };
  return (
    <div>
      <Explore accessToken={accessToken} />
    </div>
  );
}

export default ExplorePage;
