import { useEffect, useState } from "react";

import { getCoinList } from "../../services/CryptoApi";
import TableCoin from "../modules/TableCoin";
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
      <TableCoin coin={coin} />
    </div>
  );
};

export default HomePage;
