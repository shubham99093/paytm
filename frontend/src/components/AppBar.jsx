const AppBar = () => {
  return (
    <div className="w-screen shadow border h-20 flex justify-between">
      <div className="flex flex-col justify-center ml-4 h-full font-bold ">
        PayTM App
      </div>
      <div className="flex items-center">
        <div className="flex flex-col justify-center mr-4 font-medium">
          Hello, User
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-lg">U</div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
