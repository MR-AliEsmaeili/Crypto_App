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
            className="px-5 py-2 border border-blue-700 text-gray-300 rounded-xl"
            name="market_caps"
          >
            ارزش بازار
          </button>
          <button
            onClick={(e) => setType(e.target.name)}
            className="px-5 py-2 border border-blue-700 text-gray-300 rounded-xl"
            name="prices"
          >
            قیمت
          </button>
          <button
            onClick={(e) => setType(e.target.name)}
            className="px-5 py-2 border border-blue-700 text-gray-300 rounded-xl"
            name="total_volumes"
          >
            حجم بازار
          </button>
        </div>
        <div className="flex justify-around mt-12">
          <p>قیمت فعلی :${Showchart.data.current_price}</p>
          <p>ارزش بازار :${Showchart.data.market_cap}</p>
          <p>کمترین قیمت در 24 ساعت اخیر :${Showchart.data.low_24h}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
