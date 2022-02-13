import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getSession } from 'next-auth/react';
import { getEnv } from '@/utils/env';
import { Product } from '@/features/products/components/Product';
import { getProduct } from '@/features/products/api';
import { useGetSaleProduct } from '@/features/products/hooks/saleProduct';

type ProductProps = Readonly<{ id: string }>;

export default function ProductPage(props: ProductProps) {
  const { data: product, isLoading, refetch } = useGetSaleProduct(props.id);

  if (isLoading) {
    return <div></div>;
  }
  if (!product) {
    throw new Error('product not found');
  }

  return (
    <article className="group relative">
      <Product product={product} />
      <button onClick={() => refetch()}> refresh!</button>
    </article>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  const id = (context.params?.id as string) || '';

  await queryClient.prefetchQuery('products', () => getProduct(id));

  if (!session) {
    return {
      redirect: {
        destination: getEnv('NEXTAUTH_SIGNIN_URL'),
        permanent: false,
      },
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};
