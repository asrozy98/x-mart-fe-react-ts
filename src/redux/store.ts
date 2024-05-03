import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import customerReducer from "./slice/customerSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
