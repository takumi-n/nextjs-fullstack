import { Product } from '@/schema/product';

export type Action =
  | { type: 'addProduct'; payload: Product }
  | { type: 'deleteProduct'; payload: Product }
  | { type: 'openMenu' }
  | { type: 'closeMenu' };

export type State = {
  readonly products: Array<Product>;
  readonly amount: { [productId: string]: number };
  readonly totalPrice: number;
  readonly isOpen: boolean;
};
