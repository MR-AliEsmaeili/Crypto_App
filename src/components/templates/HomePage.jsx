import { useEffect, useState } from "react";

import { ColorRing } from "react-loader-spinner";
import { getCoinList, options } from "../../services/CryptoApi";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

const HomePage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [Showchart, setShowChart] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(getCoinList(page, currency), options);
        const json = await res.json();
        setCoin(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, currency]);

  return (
    <>
      <div className="p-5 bg-slate-800 rounded-xl mb-5 border border-gray-400">
        <h1 className="text-3xl text-center"> اپلیکیشن ارز دیجیتال</h1>
      </div>
      <div>
        <Search
          currency={currency}
          setCurrency={setCurrency}
          setLoading={setLoading}
        />
      </div>
      <div>
        {loading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{ margin: "40vh auto" }}
            wrapperClass=""
          />
        ) : (
          <TableCoin coin={coin} setShowChart={setShowChart}/>
        )}
        <Pagination page={page} setPage={setPage} />
      </div>
      {!!Showchart &&<Chart setShowChart={setShowChart}/>}
    </>
  );
};

export default HomePage;
