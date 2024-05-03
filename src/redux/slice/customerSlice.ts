import { createSlice } from "@reduxjs/toolkit";
import { CustomerInterface } from "../../page/DataMarket";

const initialCustomer: CustomerInterface = {
  qrCode: "",
  nama: "",
  wallet: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomer,
  reducers: {
    setCustomer(state, action) {
      return action.payload;
    },
    clearCustomer() {
      return initialCustomer;
    },
  },
});

export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
