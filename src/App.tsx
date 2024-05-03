import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./page/Cart";
import { DataMarket } from "./page/DataMarket";
import DetailTransaksi from "./page/DetailTransaksi";
import Home from "./page/Home";
import RiwayatTransaksi from "./page/RiwayatTransaksi";
import ScanCustomer from "./page/ScanCustomer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/start",
    element: <ScanCustomer />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/data",
    element: <DataMarket />,
  },
  {
    path: "/transaksi",
    element: <RiwayatTransaksi />,
  },
  {
    path: "/transaksi/detail",
    element: <DetailTransaksi />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
