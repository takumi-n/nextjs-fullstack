import { useCart } from '@/features/cart/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';
import Price from '@/components/Price';
import { SaleProduct } from '../../../schema/product';

type ProductProps = { readonly product: SaleProduct };

export const Product = ({ product }: ProductProps) => {
  const { id, image, name, price, isSale, salePrice } = product;
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'addProduct', payload: product });
    dispatch({ type: 'openMenu' });
  };

  return (
    <>
      <div>
        <Link href="/products/[id]" as={`/products/${id}`}>
          <a className="group w-80 h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3">
            <Image
              src={image}
              loading="lazy"
              alt="Photo by Rachit Tank"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
              layout="fill"
            />

            {product.isSale && (
              <span className="bg-red-500 text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5">
                SALE
              </span>
            )}
          </a>
        </Link>

        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1">
              {name}
            </a>
          </Link>

          <div className="flex items-end gap-2">
            {isSale && salePrice ? (
              <>
                <span className="text-gray-800 lg:text-lg font-bold">
                  ¥ <Price price={salePrice} />
                </span>
                <span className="text-red-500 line-through mb-0.5">
                  ¥ <Price price={price} />
                </span>
              </>
            ) : (
              <span className="text-gray-800 lg:text-lg font-bold">
                ¥ <Price price={price} />
              </span>
            )}
          </div>

          <div className="flex">
            <button
              onClick={addToCart}
              className="group outline-none flex-1 justify-center py-2 px-4 mx-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
