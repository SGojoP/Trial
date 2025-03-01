import { Link } from "react-router-dom";
import Inner from "../Components/Inner";

const About = () => {
    return (
      <Inner>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Go to Home
        </Link>
      <div className="flex flex-col justify-center items-center text-black">
        <div className="w-full h-[100vh]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, aspernatur. Sapiente tenetur, quasi itaque quaerat est doloremque asperiores accusantium placeat fugiat consequatur quibusdam alias nulla excepturi rem facere eligendi delectus?
        </div>
        <h1 className="text-4xl font-bold">About Page</h1>
      </div>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Go to Home
        </Link>
      </Inner>
    );
  };
  
  export default About;
  