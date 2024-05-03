import { faCartPlus, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { BarangInterface } from "../page/DataMarket";
import { addToCart } from "../redux/slice/cartSlice";

const BarangCard = ({ data }: { data: BarangInterface }) => {
  const dispatch = useDispatch();

  const addItemToCart = (data: BarangInterface) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="w-48 xl:w-40 h-48 flex flex-col justify-between rounded-md border border-white bg-green-800/50">
      <div className="flex justify-center p-2">
        <FontAwesomeIcon icon={faGift} size="5x" />
      </div>
      <div className="w-full flex flex-col items-center px-2">
        <h2 className="h-fit text-md text-center overflow-hidden text-ellipsis">
          {data.namaBarang}
        </h2>
        <h2 className="text-md text-gray-400">
          Rp {Number(data.hargaSatuan).toLocaleString()}
        </h2>
      </div>
      <button
        className="w-full flex justify-center items-center gap-2 bg-green-400 rounded-b-md p-1"
        onClick={() => addItemToCart(data)}
      >
        <FontAwesomeIcon icon={faCartPlus} size="sm" />
        <p>Tambah</p>
      </button>
    </div>
  );
};

export default BarangCard;
