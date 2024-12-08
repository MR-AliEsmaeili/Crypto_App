import { useEffect, useState } from "react";

import { getCoinList } from "../../services/CryptoApi";
import TableCoin from "../modules/TableCoin";
import { RotatingTriangles } from "react-loader-spinner";
import Pagination from "../modules/Pagination";
const HomePage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
 
  useEffect(() => {

    setLoading(true);
    const getData = async () => { 
      const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-fC8kVqLjfTAQ7PtxobqeWewT'}
  };
      const res = await fetch(getCoinList(page),options);
      const json = await res.json();
      setCoin(json);
      setLoading(false);
      console.log(page);

    };
    getData();
  }, [page]);

  return (
    <div>
      {loading ? (
        <RotatingTriangles
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rotating-triangles-loading"
          wrapperStyle={{ margin: "40vh auto" }}
          wrapperClass=""
        />
      ) : (
        <TableCoin coin={coin} />
      )}
      <Pagination page={page} setPage={setPage} />

    </div>
  );
};

export default HomePage;
