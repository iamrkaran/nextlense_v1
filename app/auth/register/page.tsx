import { RegisterForm } from '@/components/auth/register-form';
import Logo from '@/components/Logo';

export default function signUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <RegisterForm />
      </div>
    </main>
  );
}
