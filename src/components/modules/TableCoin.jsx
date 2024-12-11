import ChartUp from "../../assets/chart-up.svg";
import ChartDown from "../../assets/chart-down.svg";
const toPersianDigits = (number) => {
  return number.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
const TableCoin = ({ coin , setShowChart }) => {
  const showHandler = () => setShowChart(true);
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg my-10">
      <table className="w-full bg-stone-700 rounded-xl text-center text-sm table-auto border border-gray-400">
        <thead>
          <tr className="bg-slate-800 text-gray-200">
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
            onClick={showHandler}
              key={data.id}
              className={`${
                index % 2 === 0 ? "bg-stone-700" : "bg-stone-800"
              } hover:bg-stone-600 text-gray-300 cursor-pointer`}
            >
              <td className="py-3 px-4"  >
                <div className="flex items-center justify-center gap-2  space-x-2 rtl:space-x-reverse" >
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-6 h-6 rounded-full "
                  />
                  <p className="font-bold ">{data.symbol.toUpperCase()}</p>
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
                  src={
                    data.price_change_percentage_24h > 0 ? ChartUp : ChartDown
                  }
                  alt={data.symbol}
                  className="w-16 h-6"
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
