import { useQuery } from 'react-query';
import { getProduct, getProducts } from '../api';

export const useGetProduct = (id: string) => {
  return useQuery(`product/${id}`, () => getProduct(id));
};

export const useGetProducts = () => {
  return useQuery('products', getProducts);
};
