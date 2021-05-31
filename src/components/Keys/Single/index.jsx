import React from "react";

function SingleKey({ data, onClickHandler }) {
  return (
    <div className="p-2">
      <div
        onClick={() => onClickHandler(data.id)}
        className="active:bg-orange-400 active:text-orange-100 select-none w-full h-20 border-2 font-mono font-bold text-2xl text-orange-800 border-orange-900 rounded-3xl flex justify-center items-center cursor-pointer"
      >
        <div>{data.value}</div>
      </div>
    </div>
  );
}

export default SingleKey;