import { Product } from './Product';
import { useGetSaleProducts } from '../hooks/saleProduct';

export const Products = () => {
  const { data: products } = useGetSaleProducts();

  if (products) {
    products.map((product) => product.id);
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-end gap-4 mb-6">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">Products</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
          {products && products.map((product) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};
