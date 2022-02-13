import { Layout } from '@/components/Layout';
import { SignInButton } from '@/features/auth/components/SignInButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();

  const { status } = useSession();
  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <Layout>
      <SignInButton />
    </Layout>
  );
}
