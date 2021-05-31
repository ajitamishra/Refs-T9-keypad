import React, { useState, useRef } from "react";
import MultipleKey from "../Keys/Multiple";
import SingleKey from "../Keys/Single";

function KeyPad({ setText, text }) {
  const [isUpper,setIsUpper]=useState(false)
  const keysValues = [
    { type: "single", value: "1" },
    { type: "multiple", longPressValue: "2", value: isUpper ? "ABC":"abc"},
    { type: "multiple", longPressValue: "3", value: isUpper ? "DEF":"def" },
    { type: "multiple", longPressValue: "4", value: isUpper ? "GHI":"ghi" },
    { type: "multiple", longPressValue: "5", value: isUpper ? "JKL":"jkl" },
    { type: "multiple", longPressValue: "6", value: isUpper ? "MNO":"mno" },
    { type: "multiple", longPressValue: "7", value: isUpper ? "PQRS":"pqrs" },
    { type: "multiple", longPressValue: "8", value: isUpper ? "TUV":"tuv" },
    { type: "multiple", longPressValue: "9", value: isUpper ? "WXYZ":"wxyz" },
    { type: "single", value: "*" },
    { type: "single", value: "0" },
    { type: "single", value: "#" },
    { type: "caps", value: "caps" },
    { type: "space", value: "spc" },
    { type: "back", value: "del" },
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
        else  if (keysValues[index].type === "space") {
          console.log(timer.current);
          var s =  text.current.previousValue; 
        
          let newText = {
            previousValue: s+" ",
            currentValue: "",
          };
          setText(newText);
          clearTimeout(timer.current);
          timer.current = null;
   
        }
        else  if (keysValues[index].type === "caps") {
           setIsUpper(!isUpper)
           console.log("caps clicked");
          let newText = {
            previousValue: text.current.previousValue,
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
        if(keysValues[index].type === "back")
        {
          var s= text.current.previousValue;
          setText({
            previousValue:
              s.substring(0,s.length-1) ,
            currentValue: "",
          });
        }
       else if(keysValues[index].type === "space")
        {
          var s= text.current.previousValue;
          setText({
            previousValue:s + " " ,
            currentValue: "",
          });
        }
        else if(keysValues[index].type === "caps")
        {
          var s= text.current.previousValue;
          setText({
            previousValue:s  ,
            currentValue: "",
          });
        }
        else
        {
        setText({
          previousValue:
            text.current.previousValue +
            text.current.currentValue +
            keysValues[index].value,
          currentValue: "",
        });
      }
      }
    }
    setButtonIdx(index);
  };

  return (
    <div className="w-full my-2 px-1">
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