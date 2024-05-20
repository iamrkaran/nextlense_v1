import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <br />
        {session?.accessToken}
      </div>
    </div>
  );
}
