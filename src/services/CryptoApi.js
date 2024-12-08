const BASE_URL = "https://api.coingecko.com/api/v3";
const KEY = "CG-fC8kVqLjfTAQ7PtxobqeWewT";

const getCoinList = ({ page }) => {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=20&page=${page}&price_change_percentage=24h&x-cg-demo-api-key=${KEY}`;
  return url;
};
export { getCoinList };
