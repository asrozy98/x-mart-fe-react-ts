import Header from "../component/Header";

function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
      <div className="relative w-full md:w-1/4 h-1/2 flex flex-col justify-evenly items-center bg-green-600/30 rounded-md pt-14">
        <Header />
        <a href="/start" className="bg-green-600 text-white rounded-md p-2">
          Mulai Belanja
        </a>
        <a href="/data" className="bg-green-600 text-white rounded-md p-2">
          Data Market
        </a>
        <a href="/transaksi" className="bg-green-600 text-white rounded-md p-2">
          Riwayat Transaksi
        </a>
      </div>
    </div>
  );
}

export default Home;
