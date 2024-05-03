import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { requestApi } from "../libs/client";

export interface CustomerInterface {
  id?: number;
  qrCode: string;
  nama: string;
  wallet: string;
}

export interface BarangInterface {
  id?: number;
  rfid: string;
  namaBarang: string;
  hargaSatuan: number;
}

interface TransaksiInterface {
  id?: number;
  qrCode: string;
  rfid: string;
  namaBarang: string;
  hargaSatuan: number;
  jumlah: number;
  tanggal: string;
}

export interface BarangItemInterface {
  item: Array<BarangInterface>;
}

export interface CustomerItemInterface {
  item: Array<CustomerInterface>;
}

export interface TransaksiItemInterface {
  item: Array<TransaksiInterface>;
}

const initialBarang: BarangItemInterface = {
  item: [],
};

const initialCustomer: CustomerItemInterface = {
  item: [],
};

const initialTransaksi: TransaksiItemInterface = {
  item: [],
};

const DataMarket = () => {
  const [type, setType] = useState("Customer");
  const [customer, setCustomer] = useState(initialCustomer);
  const [barang, setBarang] = useState(initialBarang);
  const [transaksi, setTransaksi] = useState(initialTransaksi);
  const navigate = useNavigate();

  const getCustomer = async () => {
    const response = await requestApi({
      baseUrl: "http://localhost:8080/api/customer",
    });
    if (response) {
      setCustomer({ item: response.data });
    }
  };

  const getBarang = async () => {
    const response = await requestApi({
      baseUrl: "http://localhost:8080/api/barang",
    });
    if (response) {
      setBarang({ item: response.data });
    }
  };

  const getTransaksi = async () => {
    const response = await requestApi({
      baseUrl: "http://localhost:8080/api/transaksi",
    });
    if (response) {
      setTransaksi({ item: response.data });
    }
  };

  function getDate(data: string) {
    const date = new Date(data).toLocaleDateString("es-CL");
    return date;
  }

  const renderTable = () => {
    if (type === "Customer") {
      return (
        <table className="table-auto border border-white border-collapse mt-5 mx-auto">
          <thead className="border border-white bg-green-800 font-bold">
            <tr className="border border-white">
              <td className="border border-white">Id</td>
              <td className="border border-white">Nama</td>
              <td className="border border-white">QR Code</td>
              <td className="border border-white">Wallet</td>
            </tr>
          </thead>
          <tbody className="border border-white">
            {customer.item.map((item, index) => {
              return (
                <tr
                  key={"customer-" + index}
                  className={`border border-white ${
                    index % 2 === 0 && "bg-gray-400/40"
                  }`}
                >
                  <td className="border border-white">{item.id}</td>
                  <td className="border border-white">{item.nama}</td>
                  <td className="border border-white">{item.qrCode}</td>
                  <td className="border border-white">{item.wallet}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else if (type === "Barang") {
      return (
        <table className="table-auto border border-white border-collapse mt-5 mx-auto">
          <thead className="border border-white bg-green-800 font-bold">
            <tr className="border border-white">
              <td className="border border-white">Id</td>
              <td className="border border-white">RfId</td>
              <td className="border border-white">Nama Barang</td>
              <td className="border border-white">Harga Satuan</td>
            </tr>
          </thead>
          <tbody className="border border-white">
            {barang.item.map((item, index) => {
              return (
                <tr
                  key={"barang-" + index}
                  className={`border border-white ${
                    index % 2 === 0 && "bg-gray-400/40"
                  }`}
                >
                  <td className="border border-white">{item.id}</td>
                  <td className="border border-white">{item.rfid}</td>
                  <td className="border border-white">{item.namaBarang}</td>
                  <td className="border border-white">
                    {Number(item.hargaSatuan).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="table-auto border border-white border-collapse mt-5 mx-auto">
          <thead className="border border-white bg-green-800 font-bold">
            <tr className="border border-white">
              <td className="border border-white">Id</td>
              <td className="border border-white">QR Code</td>
              <td className="border border-white">RfId</td>
              <td className="border border-white">Harga Satuan</td>
              <td className="border border-white">Jumlah</td>
              <td className="border border-white">Total</td>
              <td className="border border-white">Tanggal Pesan</td>
            </tr>
          </thead>
          <tbody className="border border-white">
            {transaksi.item.map((item, index) => {
              return (
                <tr
                  key={"cart-" + index}
                  className={`border border-white ${
                    index % 2 === 0 && "bg-gray-400/40"
                  }`}
                >
                  <td className="border border-white">{item.id}</td>
                  <td className="border border-white">{item.qrCode}</td>
                  <td className="border border-white">{item.rfid}</td>
                  <td className="border border-white">
                    Rp {Number(item.hargaSatuan).toLocaleString()}
                  </td>
                  <td className="border border-white">{item.jumlah}</td>
                  <td className="border border-white">
                    Rp {(item.hargaSatuan * item.jumlah).toLocaleString()}
                  </td>
                  <td className="border border-white">
                    {getDate(item.tanggal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  useEffect(() => {
    getCustomer();
    getBarang();
    getTransaksi();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="relative w-full lg:w-2/3 h-fit flex flex-col justify-between items-center bg-green-600/30 rounded-md pt-14">
        <Header />
        <h1 className="text-4xl">List Data {type}</h1>
        <div className="w-full md:w-1/2 flex flex-row justify-between items-center mt-4">
          <button
            className={
              type === "Customer"
                ? "bg-green-600 rounded-md p-2"
                : "bg-green-900 rounded-md p-2"
            }
            onClick={() => setType("Customer")}
          >
            Customer
          </button>
          <button
            className={
              type === "Barang"
                ? "bg-green-600 rounded-md p-2"
                : "bg-green-900 rounded-md p-2"
            }
            onClick={() => setType("Barang")}
          >
            Barang
          </button>
          <button
            className={
              type === "Transaksi"
                ? "bg-green-600 rounded-md p-2"
                : "bg-green-900 rounded-md p-2"
            }
            onClick={() => setType("Transaksi")}
          >
            Transaksi
          </button>
        </div>
        {renderTable()}
        <div className="w-full flex flex-row justify-between p-2">
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

export { DataMarket, initialBarang, initialTransaksi };
