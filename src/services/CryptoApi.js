const BASE_URL = "https://api.coingecko.com/api/v3";
// const KEY = "CG-fC8kVqLjfTAQ7PtxobqeWewT";&x-cg-demo-api-key=${KEY}

const getCoinList = ( page ) => {
  return `${BASE_URL}/coins/markets?vs_currency=usd&per_page=20&page=${page}&price_change_percentage=24h`;
   
};
export { getCoinList };
