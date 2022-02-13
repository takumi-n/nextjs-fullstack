import * as y from 'yup';

export const productSchema = y.object().shape({
  id: y.string().required(),
  description: y.string().required(),
  name: y.string().required(),
  price: y.number().required(),
  image: y.string().required(),
});
export type Product = y.InferType<typeof productSchema>;

export const productsSchema = y.array(productSchema);
export type Products = y.InferType<typeof productsSchema>;

export const saleProductSchema = y.object().shape({
  id: y.string().required(),
  description: y.string().required(),
  name: y.string().required(),
  price: y.number().required(),
  image: y.string().required(),
  isSale: y.boolean().required(),
  salePrice: y.number(),
});
export type SaleProduct = y.InferType<typeof saleProductSchema>;

export const saleProductsSchema = y.array(saleProductSchema);
export type SaleProducts = y.InferType<typeof saleProductsSchema>;
