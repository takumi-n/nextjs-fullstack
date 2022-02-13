import { getSaleProduct, getSaleProducts } from '../api';
import { useQuery } from 'react-query';

export const useGetSaleProducts = () => {
  return useQuery('saleProducts', getSaleProducts);
};

export const useGetSaleProduct = (id: string) => {
  return useQuery(`saleProduct/${id}`, () => getSaleProduct(id));
};
