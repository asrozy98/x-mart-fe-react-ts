import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  CartItemInterface,
  decreaseItem,
  increaseItem,
  removeItemCart,
} from "../redux/slice/cartSlice";

const CartItem = ({ data }: { data: CartItemInterface }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-between text-white bg-green-800/50 rounded-md p-2">
      <div className="w-1/3 flex flex-col">
        <h2 className="text-base">{data.namaBarang}</h2>
        <h2 className="text-base text-gray-400">
          Rp {Number(data.hargaSatuan).toLocaleString()}
        </h2>
      </div>
      <div className="w-2/3 flex flex-row items-center justify-evenly gap-4">
        <div className="flex">
          <button onClick={() => dispatch(decreaseItem(data.rfid))}>
            <FontAwesomeIcon icon={faMinusCircle} size="xl" />
          </button>
          <h3 className="text-xl mx-3">{data.jumlah}</h3>
          <button onClick={() => dispatch(increaseItem(data.rfid))}>
            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
          </button>
        </div>
        <h2 className="text-base font-bold text-gray-300">
          Rp {(data.hargaSatuan * data.jumlah).toLocaleString()}
        </h2>
        <button onClick={() => dispatch(removeItemCart(data.rfid))}>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
