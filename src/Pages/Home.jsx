import { Link } from "react-router-dom";
import Inner from "../Components/Inner";
import Preloader from './../Components/Preloader/index';
import { useEffect, useState } from 'react';

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasPreloaderRun = localStorage.getItem("preloaderShown");

    if (!hasPreloaderRun) {
      setShowPreloader(true);
      localStorage.setItem("preloaderShown", "true");
    }
  }, []);
    return (
    <Inner>
      {showPreloader ? <Preloader /> : <div>Your Home Page Content</div>}
      <Link
        to="/about"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Go to About
      </Link>
    <div className="flex flex-col justify-center items-cente text-black">
      <div className="w-full h-[100vh]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis molestias, sit est accusantium fugit nam at quis dignissimos! Odit quisquam quis cumque laudantium totam quos doloremque expedita eveniet reiciendis recusandae!
      </div>
      <h1 className="text-4xl font-bold">Home Page</h1>
    </div>
      <Link
        to="/about"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Go to About
      </Link>
    </Inner>
  );
};
  
export default Home;
  