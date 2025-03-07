import { Link } from "react-router-dom";
import Inner from "../Components/Inner";
const Home = () => {
    return (
    <Inner>
      <Link
        to="/about"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Go to About
      </Link>
      <Link 
        to="/newsletter"
        className="mt-4 px-4 py-2 bg-black text-white rounded"  
      >
          Go to Newsletter
      </Link>
      <Link 
        to="/admin"
        className="mt-4 px-4 py-2 bg-black text-white rounded"  
      >
          Admin
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
  