import React from "react";

function Textarea({ text, setText }) {
  const onChangeHandler = (e) => {
    setText({
      previousValue: e.target.value,
      currentValue: "",
    });
  };
  return (
    <div className="w-full flex justify-center">
      <textarea
        className="w-full h-60 outline-none p-4 rounded-lg"
        value={text.current.previousValue + text.current.currentValue}
        onChange={onChangeHandler}
      ></textarea>
    </div>
  );
}

export default Textarea;