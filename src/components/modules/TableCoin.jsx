// import ChartUp from "../../assets/chart-up.svg";
// import ChartDown from "../../assets/chart-down.svg";

// const TableCoin = ({ coin }) => {
//   return (
//     <table className=" w-full bg-stone-700 rounded-xl table-auto	text-center">
//       <thead >
//         <tr>
//           <td  className="bg-slate-800 py-2">ارز دیجیتال</td>
//           <td  className="bg-slate-800 py-2">قیمت فعلی</td>
//           <td  className="bg-slate-800 py-2">تغییرات 📈</td>
//           <td  className="bg-slate-800 py-2">حجم معاملات </td>
//           <td  className="bg-slate-800 py-2">نمودار</td>
//         </tr>
//       </thead>
//       <tbody>
//         {coin.map((data) => (
//           <tr key={data.id}>
//             <td>
//               <div className="flex ">
//                 <img src={data.image} alt={data.name} className="w-5 h-5" />
//                 <p>{data.symbol.toUpperCase()}</p>
//               </div>
//             </td>
//             <td dir="ltr">{data.current_price}$</td>
//             <td
//               dir="ltr"
//               className={
//                 data.price_change_percentage_24h > 0
//                   ? "text-green-600"
//                   : "text-red-500"
//               }
//             >
//               {data.price_change_percentage_24h.toFixed(2)}%
//             </td>
//             <td dir="ltr">{data.total_volume}</td>
//             <td className="justify-center">
//               <img
//                 src={data.price_change_percentage_24h > 0 ? ChartUp : ChartDown}
//                 alt={data.symbol}              />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TableCoin;
import ChartUp from "../../assets/chart-up.svg";
import ChartDown from "../../assets/chart-down.svg";
const toPersianDigits = (number) => {
  return number
    .toString()
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
const TableCoin = ({ coin }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="w-full bg-stone-800 rounded-xl text-center text-sm table-auto">
        <thead>
          <tr className="bg-slate-900 text-gray-200">
            <th className="py-3 px-4">ارز دیجیتال</th>
            <th className="py-3 px-4">قیمت فعلی</th>
            <th className="py-3 px-4">تغییرات 📈</th>
            <th className="py-3 px-4">حجم معاملات</th>
            <th className="py-3 px-4">نمودار</th>
          </tr>
        </thead>
        <tbody>
          {coin.map((data, index) => (
            <tr
              key={data.id}
              className={`${
                index % 2 === 0 ? "bg-stone-700" : "bg-stone-800"
              } hover:bg-stone-600 text-gray-300 cursor-pointer`}
            >
              <td className="py-3 px-4">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="font-bold">{data.symbol.toUpperCase()}</p>
                </div>
              </td>
              <td dir="ltr" className="py-3 px-4 font-bold">
                {toPersianDigits(data.current_price.toLocaleString())}$
              </td>
              <td
                dir="ltr"
                className={`py-3 px-4 font-bold ${
                  data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {toPersianDigits(data.price_change_percentage_24h.toFixed(2))}%
              </td>
              <td dir="ltr" className="py-3 px-4 font-bold">
                {toPersianDigits(data.total_volume.toLocaleString())}
              </td>
              <td className="py-3 px-4 flex items-center justify-center">
                <img
                  src={data.price_change_percentage_24h > 0 ? ChartUp : ChartDown}
                  alt={data.symbol}
                  className="w-10 h-6"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCoin;
