import { create } from 'zustand';
import { CartStateItem, getCartDetails } from '@/shared/lib/get-cart-details';
import { Api } from '@/shared/services/api-client';
import { CreateCartItemValues } from '../services/dto/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    set({ loading: true });
    try {
      const data = await Api.cart.getCartItem();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id, quantity) => {
    set({ loading: true });
    try {
      const data = await Api.cart.updateCartItemQuanttity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    set({ loading: true });
    try {
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id) => {
    set({ loading: true });
    try {
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));