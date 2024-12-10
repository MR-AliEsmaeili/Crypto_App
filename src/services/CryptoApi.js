const BASE_URL = "https://api.coingecko.com/api/v3";
// const KEY = "CG-fC8kVqLjfTAQ7PtxobqeWewT";&x-cg-demo-api-key=${KEY}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-fC8kVqLjfTAQ7PtxobqeWewT",
  },
};

const getCoinList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&price_change_percentage=24h`;
};

const getSearch = (query) => `${BASE_URL}/search?query=${query}`;
export { options, getCoinList, getSearch };
