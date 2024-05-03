import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const Header = () => {
  return (
    <div className="absolute top-0 w-full h-12 flex justify-between items-center gap-2 bg-green-700 rounded-t-md p-2">
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1 className="text-4xl">X-Mart</h1>
      <img src={viteLogo} className="logo react" alt="React logo" />
    </div>
  );
};

export default Header;
