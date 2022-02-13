import type Prisma from '@prisma/client';
import { useCart } from '../hooks/useCart';
import Image from 'next/image';
import Price from '@/components/Price';
import { SaleProduct } from '@/schema/product';

type CartItemProps = { product: SaleProduct };

export const CartItem = ({ product }: CartItemProps) => {
  const { id, name, price, image } = product;
  const { dispatch } = useCart();

  const handleDelete = (product: SaleProduct) => {
    dispatch({ type: 'deleteProduct', payload: product });
  };

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={image}
          alt=""
          className="w-full h-full object-center object-cover"
          width="100"
          height="100"
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{name}</h3>
          <p className="ml-4">
            ¥ <Price price={price} />
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex">
            <button
              type="button"
              onClick={() => handleDelete(product)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
