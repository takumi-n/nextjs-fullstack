import { fetcher } from '@/utils/fetcher';
import {
  productSchema,
  productsSchema,
  saleProductSchema,
  saleProductsSchema,
} from '@/schema/product';

export const getProduct = async (id: string) => {
  return await fetcher(`/api/products/${id}`, {
    method: 'GET',
    schema: productSchema,
  });
};

export const getProducts = async () => {
  return await fetcher('/api/products', {
    method: 'GET',
    schema: productsSchema,
  });
};

export const getSaleProduct = async (id: string) => {
  return await fetcher(`/api/saleProducts/${id}`, {
    method: 'GET',
    schema: saleProductSchema,
  });
};

export const getSaleProducts = async () => {
  return await fetcher('/api/saleProducts', {
    method: 'GET',
    schema: saleProductsSchema,
  });
};
