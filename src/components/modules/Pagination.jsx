const Pagination = ({page , setPage}) => {
  const active="bg-sky-700 text-white  rounded-xl cursor-pointer py-1 px-2 mx-1 duration-150 border border-white";
  const disable=" text-white  rounded-xl cursor-pointer py-1 px-2 mx-1 duration-150 border border-white";
  const prevHandler = () =>{
 
      if(page >=1) {

        setPage((page)=> page-1)
      }
  }
  const nextHandler = () =>{
   
    if( page <=10){setPage((page)=> page+1) 
      }
  }
  
  return <>
  <div className="flex justify-center p-0 my-10" >

  <button  onClick={prevHandler} disabled={page===1} className="text-white bg-orange-600 py-1 px-2 mx-2 rounded-xl">قبل</button>
  <p className={page === 1 ? active:disable}>1</p>
  <p className={page === 2 ? active:disable}>2</p>
  {
    page > 2 && page <9 && (
      <>
      <span>...</span>
      <p className={active}>{page}</p>
      </>
    )
  }
  <span>...</span>
  <p className={page === 9 ? active:disable}>9</p>
  <p className={page === 10 ? active:disable}>10</p>
  <button onClick={nextHandler} disabled={page===10} className="text-white bg-orange-600 py-1 px-2 mx-2 rounded-xl">بعد</button>
  </div>
  </>;
};

export default Pagination;
