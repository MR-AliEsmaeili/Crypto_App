import { useEffect, useState } from "react";

import { getCoinList } from "../../services/CryptoApi";
import TableCoin from "../modules/TableCoin";
import { RotatingTriangles } from "react-loader-spinner";
const HomePage = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await fetch(getCoinList(page));
      const json = await res.json();
      setCoin(json);
      setLoading(false);
    };
    getData();
  }, []);

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
    </div>
  );
};

export default HomePage;
