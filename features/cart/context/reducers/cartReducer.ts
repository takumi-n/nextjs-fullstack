import { Product } from '@/schema/product';
import type { Action, State } from '../types';

const calculateTotalPrice = (products: Array<Product>) => {
  return products.reduce((acc, curr) => acc + curr.price, 0);
};

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addProduct': {
      const newState = { ...state };

      const newProduct = action.payload;
      if (newState.amount[newProduct.id]) {
        newState.amount[newProduct.id] += 1;
      } else {
        newState.amount[newProduct.id] = 1;
        newState.products = [newProduct, ...newState.products];
      }

      const totalPrice = calculateTotalPrice(newState.products);
      newState.totalPrice = totalPrice;

      return newState;
    }

    case 'deleteProduct': {
      const products = [...state.products];
      const productToDelete = action.payload;

      const newProducts = products.filter((product) => product.id !== productToDelete.id);

      const totalPrice = calculateTotalPrice(newProducts);

      return {
        ...state,
        products: [...newProducts],
        totalPrice,
      };
    }

    case 'openMenu': {
      return {
        ...state,
        isOpen: true,
      };
    }

    case 'closeMenu': {
      return {
        ...state,
        isOpen: false,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
