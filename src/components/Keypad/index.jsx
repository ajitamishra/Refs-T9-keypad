import React, { useState, useRef } from "react";
import MultipleKey from "../Keys/Multiple";
import SingleKey from "../Keys/Single";

function KeyPad({ setText, text }) {
  const keysValues = [
    { type: "single", value: "1" },
    { type: "multiple", longPressValue: "2", value: "abc" },
    { type: "multiple", longPressValue: "3", value: "def" },
    { type: "multiple", longPressValue: "4", value: "ghi" },
    { type: "multiple", longPressValue: "5", value: "jkl" },
    { type: "multiple", longPressValue: "6", value: "mno" },
    { type: "multiple", longPressValue: "7", value: "pqrs" },
    { type: "multiple", longPressValue: "8", value: "tuv" },
    { type: "multiple", longPressValue: "9", value: "wxyz" },
    { type: "single", value: "*" },
    { type: "single", value: "0" },
    { type: "back", value: "#" },
  ];

  const timer = useRef(null);
  const itr = useRef(0);
  const [buttonIdx, setButtonIdx] = useState(null);
  const [time, setTime] = useState({ start: 0, end: 0 });
  const [isLongPressed, setIsLongPressed] = useState(false);

  const onMouseDownHandler = (index) => {
    setTime({ start: Date.now(), end: time.end });
    setIsLongPressed(false);
  };

  const onMouseUpHandler = (index) => {
    const newTime = { start: time.start, end: Date.now() };
    setTime(newTime);
    if (newTime.end - newTime.start > 1000) {
      if (timer.current === null) {
        let newText = {
          previousValue:
            text.current.previousValue + keysValues[index].longPressValue,
          currentValue: "",
        };
        setText(newText);
      } else {
        clearTimeout(timer.current);
        timer.current = null;
        setText({
          previousValue:
            text.current.previousValue +
            text.current.currentValue +
            keysValues[index].longPressValue,
          currentValue: "",
        });
      }
      setIsLongPressed(true);
    }
  };

  const onClickHandler = (index) => {
   
    if (isLongPressed) return;
    if (timer.current === null) {
      
        if (keysValues[index].type === "back") {
            console.log(timer.current);
            var s =  text.current.previousValue; 
            let newText = {
              previousValue: s.substring(0,s.length-1),
              currentValue: "",
            };
            setText(newText);
            clearTimeout(timer.current);
            timer.current = null;
     
          }
        else if (keysValues[index].type === "single") {
        let newText = {
          previousValue: text.current.previousValue + keysValues[index].value,
          currentValue: "",
        };
        setText(newText);
      } else {
       
        itr.current = 0;
        let newText = {
          previousValue: text.current.previousValue,
          currentValue: keysValues[index].value[itr.current],
        };
        setText(newText);
        timer.current = setTimeout(() => {
          let modified = {
            previousValue:
              text.current.previousValue + text.current.currentValue,
            currentValue: "",
          };
          setText(modified);
        }, 1000);
    
      }
    } else {
      if (index === buttonIdx) {
        clearTimeout(timer.current);
        timer.current = null;
        itr.current = (itr.current + 1) % keysValues[index].value.length;
        let newText = {
          previousValue: text.current.previousValue,
          currentValue: keysValues[index].value[itr.current],
        };
        setText(newText);
        timer.current = setTimeout(() => {
          let modified = {
            previousValue:
              text.current.previousValue + text.current.currentValue,
            currentValue: "",
          };
          setText(modified);
        }, 1000);
      } else if (keysValues[index].type === "multiple") {
        clearTimeout(timer.current);
        timer.current = null;
        itr.current = 0;
        setText({
          previousValue: text.current.previousValue + text.current.currentValue,
          currentValue: keysValues[index].value[itr.current],
        });
        timer.current = setTimeout(() => {
          setText({
            previousValue:
              text.current.previousValue + text.current.currentValue,
            currentValue: "",
          });
        }, 1000);
      } else {
        clearTimeout(timer.current);
        timer.current = null;
        setText({
          previousValue:
            text.current.previousValue +
            text.current.currentValue +
            keysValues[index].value,
          currentValue: "",
        });
      }
    }
    setButtonIdx(index);
  };

  return (
    <div className="w-full my-2 px-4">
      <div className="grid grid-cols-3">
        {keysValues.map((KEY, index) => {
          const data = { ...KEY, id: index };
          return KEY.type === "single" ? (
            <SingleKey
              data={data}
              onClickHandler={onClickHandler}
              key={index}
            />
          ) : (
            <MultipleKey
              data={data}
              onClickHandler={onClickHandler}
              onMouseDownHandler={onMouseDownHandler}
              onMouseUpHandler={onMouseUpHandler}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default KeyPad;