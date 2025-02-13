import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { handleError } from "../../utils";
const Show = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cars/see/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        handleError(err);
      }
    };
    fetchData();
  }, [id]);
  if (!data) {
    return (
      <div
        className="flex items-center justify-center
        text-blue-800 text-3xl h-[100vh] w-[100vw]"
      >
        Loading...
      </div>
    );
  }
  console.log(data);
  return (
    <div className="w-full min-h-[100vh] p-8 bg-slate-100 flex justify-center items-center flex-col gap-8">
      <img
        src={data.Image}
        alt="car_image"
        className=" min-w-[200px] w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[200px] sm:h-[200px] md:h-[300px] lg:h-[350px] rounded-md shadow-[0px_1px_20px_10px_#2d3748] "
      />
      <div className="min-w-[200px] w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] border-2 pt-3 rounded-lg border-[#6e5c5c] flex flex-col gap-4 shadow-[0px_1px_20px_10px_#2d3748]">
        <div className="px-3 ">
          <p className="text-[1rem] md:text-xl font-semibold  ">
            Car name:
            <span className=" italic text-[#817777] "> {data.name}</span>
          </p>
          <p className="text-[1rem] md:text-xl font-semibold  ">
            Car price:
            <span className=" italic text-[#817777] "> {data.price}</span> $
          </p>
          <p className="text-[1rem] md:text-xl font-semibold  ">
            Car hp:<span className=" italic text-[#817777] "> {data.hp}</span>{" "}
            hp
          </p>
          <p className="text-[1rem] md:text-xl font-semibold  ">
            Speed:<span className=" italic text-[#817777] "> {data.speed}</span>{" "}
            km/h
          </p>
        </div>
        <div>
          <hr className="bg-[#aca9a9] h-[2px]" />
          <p className="text-[1rem] md:text-xl font-semibold w-full flex items-center justify-between pr-5 bg-[#c0cdd8] py-2 px-2 rounded-b-lg">
            <p className="">
              Owner:{" "}
              <span className=" capitalize text-[#122455] ">
                {data.owner.username}
              </span>
            </p>
            <Link to={`/api/message/${data.owner._id}`}>
            <button className="text-[#375bd3] border-[#375bd3] border-2 px-2 py-1 rounded hover:shadow-[0px_1px_4px_1px_#2d3748] hover:text-[#142355] hover:border-[#142355]">
              Chat
            </button>
            </Link>
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default Show;
