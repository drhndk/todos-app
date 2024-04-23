const Spinner = ({widthAndHeight}) => {
    return (
      <div className="flex justify-center items-center ">
        <div className={`border-t-4 border-blue-500 border-solid rounded-full animate-spin ${widthAndHeight}`}></div>
      </div>
    );
  };
  
  export default Spinner;