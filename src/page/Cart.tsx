import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BarangCard from "../component/BarangCard";
import CartItem from "../component/CartItem";
import Header from "../component/Header";
import { requestApi } from "../libs/client";
import { clearCart } from "../redux/slice/cartSlice";
import { clearCustomer } from "../redux/slice/customerSlice";
import { RootState } from "../redux/store";
import { initialBarang } from "./DataMarket";

const Cart = () => {
  const [barang, setBarang] = useState(initialBarang);
  const cart = useSelector((state: RootState) => state.cart);
  const customer = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBarang = async () => {
    const response = await requestApi({
      baseUrl: "http://localhost:3000/api/barang",
    });
    if (response) {
      setBarang({ item: response.data });
    }
  };

  const getTotal = () => {
    if (cart.cartItem.length > 0) {
      let totalPrice = 0;
      cart.cartItem.forEach((item) => {
        totalPrice = totalPrice + item.hargaSatuan * item.jumlah;
      });
      return totalPrice.toLocaleString();
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row justify-center items-center gap-2 bg-black text-white">
      <div className="relative w-full lg:w-2/3 xl:w-3/4 2xl:w-2/4 min-h-72 flex flex-col justify-evenly items-center bg-green-600/30 rounded-md pt-14">
        <Header />
        <h1 className="text-4xl">List Barang</h1>
        <div className="w-full h-fit grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2 xl:gap-3 mt-4 p-2">
          {barang.item.length > 0 ? (
            barang.item.map((item, index) => (
              <BarangCard key={index} data={item} />
            ))
          ) : (
            <div className="w-full h-40 flex justify-center items-center">
              <h2>Kosong</h2>
            </div>
          )}
        </div>
        <div className="w-full p-2">
          <button
            className=" text-xl bg-gray-600 rounded-md p-2"
            onClick={() => {
              dispatch(clearCart());
              dispatch(clearCustomer());
              navigate(-1);
            }}
          >
            Kembali
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/3 xl:w-1/4 h-fit flex flex-col justify-between bg-green-700/30 rounded-md p-2">
        <div className="w-full min-h-64 flex flex-col gap-2 justify-start items-center rounded-xl">
          <h1 className="text-4xl">Keranjang</h1>
          {cart.cartItem.length > 0 ? (
            cart.cartItem.map((item, index) => (
              <CartItem key={"cart-" + index} data={item} />
            ))
          ) : (
            <div className="w-full h-40 flex justify-center items-center">
              <h2>Kosong</h2>
            </div>
          )}
        </div>
        <hr className="border-green-500 mt-4" />
        <div className="flex justify-between items-end mt-4">
          <div>
            {cart.cartItem.length > 0 && <h2>Total Harga: Rp {getTotal()}</h2>}
            <h2>Customer: {customer.nama}</h2>
            <h2>Wallet: {customer.wallet}</h2>
          </div>
          <button
            className="h-12 text-xl bg-green-600 rounded-md p-2"
            onClick={() => navigate("/transaksi/detail")}
          >
            Buat Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
