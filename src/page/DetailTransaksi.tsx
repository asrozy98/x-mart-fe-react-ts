import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { requestApiGraphQl } from "../libs/client";
import { clearCart } from "../redux/slice/cartSlice";
import { clearCustomer } from "../redux/slice/customerSlice";
import { RootState } from "../redux/store";

const DetailTransaksi = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const customer = useSelector((state: RootState) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const saveTransaksi = () => {
    cart.cartItem.map(async (item) => {
      const query = `mutation {
            AddTransaksi(
                data : {
                    qrCode : "${customer.qrCode}",
                    rfid : "${item.rfid}",
                    hargaSatuan : ${item.hargaSatuan},
                    jumlah : ${item.jumlah}
                }
            ){
                _id,
                qrCode,
                rfid,
                hargaSatuan,
                jumlah,
                tanggal
            }
        }`;
      await requestApiGraphQl(query);
    });
    dispatch(clearCustomer());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="relative w-full lg:w-1/2 h-fit flex flex-col justify-between items-center bg-green-600/30 text-white rounded-md pt-14">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Detail Transaksi</h1>
          <div className="w-full flex flex-row gap-2 justify-evenly items-center mt-4">
            <div className="flex justify-between items-start gap-2">
              <h2 className="text-lg font-bold">Customer :</h2>
              <h2 className="text-lg">{customer.nama}</h2>
            </div>
            <div className="flex justify-between items-start gap-2">
              <h2 className="text-lg font-bold">Wallet :</h2>
              <h2 className="text-lg">{customer.wallet}</h2>
            </div>
          </div>
          <table className="table-auto border border-white border-collapse mt-5 mx-auto">
            <thead className="border border-white bg-green-800 font-bold">
              <tr className="border border-white">
                <td className="border border-white p-2">Nama Barang</td>
                <td className="border border-white p-2">Harga Satuan</td>
                <td className="border border-white p-2">Jumlah</td>
                <td className="border border-white p-2">Total</td>
              </tr>
            </thead>
            <tbody className="border border-white">
              {cart.cartItem.map((item, index) => {
                return (
                  <tr
                    key={"cart-" + index}
                    className={`border border-white ${
                      index % 2 === 0 && "bg-gray-400/40"
                    }`}
                  >
                    <td className="border border-white p-2">
                      {item.namaBarang}
                    </td>
                    <td className="border border-white p-2">
                      {Number(item.hargaSatuan).toLocaleString()}
                    </td>
                    <td className="border border-white p-2">{item.jumlah}</td>
                    <td className="border border-white p-2">
                      Rp{" "}
                      {Number(item.hargaSatuan * item.jumlah).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="border border-white bg-green-800">
                <td className="border border-white p-2" colSpan={3}>
                  Total Bayar
                </td>
                <td className="border border-white p-2">Rp {getTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex flex-row justify-between p-2">
          <button
            className="text-xl bg-gray-600 rounded-md p-2"
            onClick={() => {
              dispatch(clearCustomer());
              dispatch(clearCart());
              navigate("/");
            }}
          >
            Kembali
          </button>
          <button
            className="text-xl bg-green-600 rounded-md p-2"
            onClick={() => {
              saveTransaksi();
            }}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksi;
