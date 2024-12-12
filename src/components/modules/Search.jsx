import { useEffect, useState } from "react";
import { getChart, getSearch, options } from "../../services/CryptoApi";
import { ColorRing } from "react-loader-spinner";
const Search = ({ currency, setCurrency, setShowChart }) => {
  const [searchQuery, setSearchQuery] = useState(""); // برای مقدار جستجو
  const [searchCoin, setSearchCoin] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // ایجاد AbortController
    const signal = controller.signal;
    setSearchCoin([]);
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchCoin([]);
        return;
      } // اگر کاربر چیزی وارد نکرده باشد، درخواست ارسال نشود
      setLoading(true);
      try {
        const res = await fetch(getSearch(searchQuery), {
          ...options,
          signal, // اتصال سیگنال برای لغو درخواست
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        if (json.coins) {
          setSearchCoin(json.coins);
        } else {
          alert("در ارتباط با سرور مشکلی ایجاد شده است . مجدد تلاش کنید .");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          alert(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();

    // Clean-up function برای لغو درخواست در هنگام Unmount یا تغییر سریع جستجو
    return () => {
      controller.abort();
    };
  }, [searchQuery]); // اجرای اثر تنها در زمان تغییر query

  return (
    <div className="flex justify-around place-items-start">
      <div>
        <input
          placeholder="جستجو"
          value={searchQuery}
          type="text"
          className="focus:outline-none px-2 py-1 bg-sky-950 border border-gray-300 rounded-lg"
          onChange={(e) => setSearchQuery(e.target.value)} // ذخیره مقدار جستجو
        />
        {loading && (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{ margin: "0vh auto" }}
            wrapperClass=""
          />
        )}
        <ul className=" h-64   overflow-y-scroll [&::-webkit-scrollbar]:w-0 dropdown absolute    bg-slate-800 bg-opacity-60 backdrop-blur-sm text-white mt-2 rounded-lg  z-10">
          {Array.isArray(searchCoin) &&
            searchCoin.map((coin) => (
              <SearchItems
                setSearchQuery={setSearchQuery}
                data={coin}
                setShowChart={setShowChart}
                key={coin.id}
              />
            ))}
        </ul>
      </div>
      <div className="flex">
        <p className="bg-sky-950 px-2 py-1 text-slate-200 border border-gray-300 rounded-s-lg">
          واحد پولی :
        </p>
        <select
          className="text-gray-300 px-2 py-1 rounded-e-lg mr-1 bg-sky-950 border border-white"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
      </div>
    </div>
  );
};

export default Search;

const SearchItems = ({ data }) => {
  const { id, thumb, api_symbol } = data;
  // const showHandler = async () => {
  //   try {
  //     const res = await fetch(getChart(id), options);
  //     const json = await res.json();
  //     setShowChart({ ...json, data });
  //     setSearchQuery("");
  //   } catch (error) {
  //     console.log(error);
  //     setShowChart(null);
  //   }

  //   //  setShowChart(true);
  // };
  return (
    <li
      // onClick={showHandler}
      className="flex justify-start place-items-center  hover:bg-slate-700  cursor-pointer p-2"
    >
      <img src={thumb} />
      <p className="mx-2">{api_symbol}</p>
    </li>
  );
};

export { SearchItems };
