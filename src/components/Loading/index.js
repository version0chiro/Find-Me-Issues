import React from "react";

const Loading = () => {
  return (
    <div className="z-20 flex justify-center items-center fixed w-full h-full bg-black/50 top-0 right-0">
      <div className="flex flex-col justify-center items-center bg-black px-5 py-2 rounded-2xl">
        <div className="border-l-4 border-white animate-spin w-8 h-8 rounded-full"></div>
        <span className="text-white">processing...</span>
      </div>
    </div>
  );
};
export default React.memo(Loading);
