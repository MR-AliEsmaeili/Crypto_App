import ChartUp from "../../assets/chart-up.svg";
import ChartDown from "../../assets/chart-down.svg";

const TableCoin = ({ coin }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ارز دیجیتال</th>
          <th>قیمت فعلی</th>
          <th>تغییرات 📈</th>
          <th>حجم معاملات </th>
          <th>نمودار</th>
        </tr>
      </thead>
      <tbody>
        {coin.map((data) => (
          <tr key={data.id}>
            <td>
              <div className="flex ">
                <img src={data.image} alt={data.name} className="w-5 h-5" />
                <p>{data.symbol.toUpperCase()}</p>
              </div>
            </td>
            <td dir="ltr">{data.current_price}$</td>
            <td
              dir="ltr"
              className={
                data.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              {data.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td dir="ltr">{data.total_volume}</td>
            <td>
              <img
                src={data.price_change_percentage_24h > 0 ? ChartUp : ChartDown}
                alt=""
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCoin;
