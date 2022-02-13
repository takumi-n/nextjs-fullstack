import { dehydrate, QueryClient } from 'react-query';
import type { GetServerSideProps } from 'next';
import { Products } from '@/features/products/components/Products';
import { getSession } from 'next-auth/react';
import { getEnv } from '@/utils/env';
import { getSaleProducts } from '@/features/products/api';
import { Layout } from '@/components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Product List</title>
      </Head>
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 self-center">
        Product List
      </h1>
      <Products />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: getEnv('NEXTAUTH_SIGNIN_URL'),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('saleProducts', getSaleProducts);

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
