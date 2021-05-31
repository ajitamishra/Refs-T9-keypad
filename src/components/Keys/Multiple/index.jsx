import React from "react";

function MultipleKey({
  data,
  onClickHandler,
  onMouseDownHandler,
  onMouseUpHandler,
}) {
  return (
    <div className="p-2 select-none">
      <div
        onClick={() => {
          onClickHandler(data.id);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDownHandler(data.id);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          onMouseUpHandler(data.id);
        }}
        onTouchStart={(e) => {
          onMouseDownHandler(data.id);
        }}
        onTouchEnd={() => {
          onMouseUpHandler(data.id);
        }}
        className="active:bg-teal-700 active:text-orange-100 w-full h-20 border-2 font-mono font-bold text-lg text-orange-800 border-orange-900 rounded-3xl flex justify-center items-center cursor-pointer flex-col leading-none"
      >
        <div>{data.value}</div>
        <div className="mt-1 text-2xl">{data.longPressValue}</div>
      </div>
    </div>
  );
}

export default MultipleKey;