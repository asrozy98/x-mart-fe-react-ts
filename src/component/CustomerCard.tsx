import QRCode from "react-qr-code";
import { CustomerInterface } from "../page/DataMarket";

const CustomerCard = ({ customer }: { customer: CustomerInterface }) => {
  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      {customer.nama === "" ? (
        <div className="flex justify-center bg-red-500 rounded-md p-2">
          <h2 className="text-xl text-white">Customer Tidak ditemukan</h2>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-around items-center gap-2 lg:gap-10">
          <QRCode value={customer.qrCode} />
          <div className="text-xl p-4">
            <h2>Nama:</h2>
            <h2 className="font-bold">{customer.nama}</h2>
            <h2>Wallet :</h2>
            <h2 className="font-bold">{customer.wallet}</h2>
            <h2>QR Code:</h2>
            <h2 className="font-bold">{customer.qrCode}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
