import { useState } from "react";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toPersianDigits } from "../../helpers/toPersianDigits";
const Chart = ({ Showchart, setShowChart }) => {
  const [type, setType] = useState("prices");
  console.log(Showchart);
  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-full">
      <span
        className="px-3 py-1 inline-block text-3xl font-extrabold text-start place-items-center m-10 cursor-pointer rounded-xl  bg-red-600"
        onClick={() => setShowChart(null)}
      >
        X
      </span>
      <div className=" bg-slate-800 p-4 w-4/6 m-auto backdrop-blur-sm opacity-90 rounded-xl text-center  border border-white">
        <div className="flex place-items-center gap-3 mr-10">
          <img
            className="w-10 h-10"
            src={Showchart.data.image}
            alt={Showchart.data.name}
          />
          <p className="font-extrabold text-xl">
            {Showchart.data.name.toUpperCase()}
          </p>
        </div>
        <div dir="ltr" className="m-5 px-4 w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convertData(Showchart, type)}>
              <Line
                type={"monotone"}
                dataKey={type}
                stroke="#3874ff"
                strokeWidth="2px"
              />
              <CartesianGrid stroke="#404042" />
              <XAxis dataKey="date" hide />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around">
          <button
            onClick={(e) => setType(e.target.name)}
            className={`${
              type === "market_caps"
                ? "px-5 py-2 border  bg-blue-700 border-blue-700 text-gray-300 rounded-xl"
                : "px-5 py-2 border border-blue-700 text-gray-300 opacity-70 rounded-xl"
            } hover:bg-blue-700 duration-500 rounded-xl `}
            name="market_caps"
          >
            ارزش بازار
          </button>
          <button
            onClick={(e) => setType(e.target.name)}
            className={`${
              type === "prices"
                ? "px-5 py-2 border bg-blue-700 border-blue-700 text-gray-300 rounded-xl"
                : "px-5 py-2 border border-blue-700 text-gray-300 opacity-70 rounded-xl"
            } hover:bg-blue-700 duration-500 rounded-xl `}
            name="prices"
          >
            قیمت
          </button>
          <button
            onClick={(e) => setType(e.target.name)}
            className={`${
              type === "total_volumes"
                ? "px-5 py-2 border bg-blue-700 border-blue-700 text-gray-300 rounded-xl"
                : "px-5 py-2 border border-blue-700 text-gray-300 opacity-70 rounded-xl"
            } hover:bg-blue-700 duration-500 rounded-xl  `}
            name="total_volumes"
          >
            حجم بازار
          </button>
        </div>
        <div className="flex justify-around mt-12">
          <p>
            قیمت فعلی :$
            {toPersianDigits(Showchart.data.current_price.toLocaleString())}
          </p>
          <p>
            ارزش بازار :$
            {toPersianDigits(Showchart.data.market_cap.toLocaleString())}
          </p>
          <p>
            کمترین قیمت در 24 ساعت اخیر :$
            {toPersianDigits(Showchart.data.low_24h.toLocaleString())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
