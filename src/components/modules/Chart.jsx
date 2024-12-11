const Chart = ({setShowChart}) => {
    return ( <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-full">
        <span className="px-3 py-1 inline-block text-xl text-start place-items-center m-10 cursor-pointer rounded-xl  bg-red-600" onClick={()=>setShowChart(null)}>X</span>
        <div className="w-100 bg-slate-800 p-2 w-3/5 m-auto backdrop-blur-sm opacity-90 rounded-xl text-center ">نمودار</div>
        </div> );
}
 
export default Chart;