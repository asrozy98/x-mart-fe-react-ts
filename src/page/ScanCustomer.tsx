import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerCard from "../component/CustomerCard";
import Header from "../component/Header";
import { requestApi } from "../libs/client";
import { setCustomer } from "../redux/slice/customerSlice";
import { RootState } from "../redux/store";

const ScanCustomer = () => {
  const [scanResult, setScanResult] = useState("");
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.customer);
  const navigate = useNavigate();

  const startScanner = async () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 500,
          height: 500,
        },
        fps: 1,
        disableFlip: false,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
        ],
      },
      false
    );
    scanner.render(
      async (result) => {
        await checkCustomer(result);
        setScanResult(result);
        scanner.clear();
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const checkCustomer = async (qrResult: string) => {
    const response = await requestApi({
      baseUrl: "http://localhost:8080/api/customer/" + qrResult,
    });
    if (response) {
      dispatch(
        setCustomer({
          nama: response.data.nama,
          wallet: response.data.wallet,
          qrCode: response.data.qrCode,
        })
      );
    }
  };

  const startShopping = () => {
    if (customer) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    startScanner();
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="relative w-full xl:w-1/2 min-h-96 flex flex-col items-center bg-green-600/30 rounded-2xl pt-14">
        {scanResult && customer ? (
          <>
            <Header />
            <h1 className="text-3xl text-center mb-5">Data Customer</h1>
            <CustomerCard customer={customer} />
            <div className="w-full flex justify-between p-2">
              <button
                className="text-xl bg-gray-600 rounded-md p-2"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
              {customer.nama !== "" && (
                <button
                  className="text-xl bg-green-600 rounded-md p-2"
                  onClick={() => startShopping()}
                >
                  Mulai Belanja
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <Header />
            <h1 className="text-3xl text-center mb-5">Scan Customer</h1>
            <div id="reader" className="w-2/3 h-96 flex-1" />
            <div className="w-full flex flex-row p-2">
              <button
                className="text-xl bg-gray-600 rounded-md p-2"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanCustomer;
