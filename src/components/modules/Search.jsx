// import { useEffect, useState } from "react";
// import { getSearch, options } from "../../services/CryptoApi";

// const Search = ({ currency, setCurrency, setLoading }) => {
//   const [searchCoin, setSearchCoin] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     const fetchSearchCoin = async () => {
//       if (!searchQuery) return;
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://api.coingecko.com/api/v3/search?query=${searchCoin}&x-cg-demo-api-key=CG-fC8kVqLjfTAQ7PtxobqeWewT`,
//           { signal }
//         );
//         if (!res.ok) throw new error("مشکل در دریافت اطلاعات از سرور!");
//         const json = await res.json();

//         setSearchCoin(json);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//       fetchSearchCoin();

//       controller.abort();
//     };
//     return () => {
//       controller.abort();
//     };
//   }, [searchQuery]);
//   useEffect(() => {
//     console.log(searchCoin);
//   });
//   return (
//     <>
//       <div className="flex justify-around place-items-center">
//         <input
//           placeholder="جستجو"
//           value={searchQuery}
//           type="text"
//           className="focus:outline-none px-2 py-1 bg-sky-950 border border-gray-300 rounded-lg"
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex">
//           <p className=" bg-sky-950 px-2 py-1 text-slate-200  border border-gray-300 rounded-s-lg">
//             واحد پولی :
//           </p>
//           <select
//             className="text-gray-300 px-2 py-1 rounded-e-lg mr-1 bg-sky-950 border border-white"
//             value={currency}
//             onChange={(e) => setCurrency(e.target.value)}
//           >
//             <option className="mt-2" value="usd">
//               USD
//             </option>
//             <option className="mt-2" value="eur">
//               EUR
//             </option>
//             <option className="mt-2" value="jpy">
//               JPY
//             </option>
//           </select>
//         </div>
//         <ul className="text-white mt-4">
//           {searchCoin.map((coin, index) => (
//             <li key={index}>{coin.name}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Search;
import { useEffect, useState } from "react";
import { getSearch, options } from "../../services/CryptoApi";

const Search = ({ currency, setCurrency }) => {
  const [searchQuery, setSearchQuery] = useState(""); // برای مقدار جستجو
  const [searchCoin, setSearchCoin] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // ایجاد AbortController
    const signal = controller.signal;

    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchCoin("");
      } // اگر کاربر چیزی وارد نکرده باشد، درخواست ارسال نشود
      setLoading(true);
      try {
        const res = await fetch(getSearch(searchQuery), {
          ...options,
          signal, // اتصال سیگنال برای لغو درخواست
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setSearchCoin(json.coins);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error(error);
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
        {loading && <p className="text-white">در حال بارگذاری...</p>}
        <ul className="dropdown absolute    bg-slate-800 bg-opacity-60 backdrop-blur-sm text-white mt-2 rounded-lg shadow-lg z-10">
          {Array.isArray(searchCoin) &&
            searchCoin.map((coin, index) => (
              <li
                key={index}
                className="flex justify-start place-items-center  hover:bg-slate-700  cursor-pointer p-2"
              >
                <img src={coin.thumb} />
                <p className="mx-2">{coin.api_symbol}</p>
              </li>
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
