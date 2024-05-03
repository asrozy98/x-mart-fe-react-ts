import { createSlice } from "@reduxjs/toolkit";

export interface CartItemInterface {
  id: number;
  rfid: string;
  namaBarang: string;
  hargaSatuan: number;
  jumlah: number;
}

interface CartInterface {
  cartItem: Array<CartItemInterface>
}

const initialState: CartInterface = {
  cartItem: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemExist = state.cartItem.some((item) => item.rfid === action.payload.rfid);

      if (itemExist) {
        state.cartItem = state.cartItem.map((item) => {
          if (action.payload.rfid === item.rfid) {
            item.jumlah = item.jumlah + 1;
          }

          return item;
        });
      } else {
        state.cartItem.push({ ...action.payload, jumlah: 1 });
      }

    },
    increaseItem(state, action) {
      state.cartItem = state.cartItem.map((item) => {
        if (action.payload === item.rfid) {
          item.jumlah = item.jumlah + 1;
        }

        return item;
      });
    },
    decreaseItem(state, action) {
      state.cartItem = state.cartItem.map((item) => {
        if (action.payload === item.rfid && item.jumlah > 1) {
          item.jumlah = item.jumlah - 1;
        }

        return item;
      });
    },
    removeItemCart(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.rfid !== action.payload);
    },
    clearCart(state) {
      state.cartItem = [];
    },
  },
});

export const { addToCart, increaseItem, decreaseItem, removeItemCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
