import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { requestApiGraphQl } from "../libs/client";
import { initialTransaksi } from "./DataMarket";

const RiwayatTransaksi = () => {
  const [transaksi, setTransaksi] = useState(initialTransaksi);
  const navigate = useNavigate();

  const getTransaksi = async () => {
    const query = `query{
        ListTransaksi{
            _id,
            qrCode,
            rfid,
            hargaSatuan,
            jumlah,
            tanggal
        }
    }`;
    const response = await requestApiGraphQl(query);
    if (response) {
      setTransaksi({ item: response.data.ListTransaksi });
    }
  };

  function getDate(data: string) {
    const date = new Date(data).toLocaleDateString("es-CL");
    return date;
  }

  useEffect(() => {
    getTransaksi();
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="relative w-full lg:w-2/3 h-fit flex flex-col justify-between items-center bg-green-600/30 text-white rounded-md pt-14">
        <Header />
        <div className="w-full flex flex-col items-center p-2">
          <h1 className="text-4xl">Riwayat Transaksi</h1>
          <table className="table-auto border border-slate-800 border-collapse mt-5 mx-auto">
            <thead className="border border-slate-800 bg-green-800 font-bold">
              <tr className="border border-slate-800">
                <td className="border border-white p-2">QR Code</td>
                <td className="border border-white p-2">RfId</td>
                <td className="border border-white p-2">Harga Satuan</td>
                <td className="border border-white p-2">Jumlah</td>
                <td className="border border-white p-2">Total</td>
                <td className="border border-white p-2">Tanggal Pesan</td>
              </tr>
            </thead>
            <tbody className="border border-slate-800">
              {transaksi.item.map((item, index) => {
                return (
                  <tr
                    key={"cart-" + index}
                    className={`border border-slate-800 ${
                      index % 2 === 0 && "bg-gray-400/40"
                    }`}
                  >
                    <td className="border border-white p-2">{item.qrCode}</td>
                    <td className="border border-white p-2">{item.rfid}</td>
                    <td className="border border-white p-2">
                      Rp {Number(item.hargaSatuan).toLocaleString()}
                    </td>
                    <td className="border border-white p-2">{item.jumlah}</td>
                    <td className="border border-white p-2">
                      Rp {(item.hargaSatuan * item.jumlah).toLocaleString()}
                    </td>
                    <td className="border border-white p-2">
                      {getDate(item.tanggal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full flex flex-row p-2">
          <button
            className="text-xl text-white bg-gray-600 rounded-md p-2"
            onClick={() => navigate("/")}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatTransaksi;
