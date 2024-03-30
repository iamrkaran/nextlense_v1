'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Page = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>Dashboard</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'unauthenticated' && <p>Access Denied</p>}
      {status === 'authenticated' && (
        <div>
          <p>Welcome {session?.user?.email}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Page;
