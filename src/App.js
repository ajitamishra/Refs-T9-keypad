import React, { useEffect, useRef, useState } from "react";
import KeyPad from "./components/Keypad";
import Textarea from "./components/Textarea";

function App() {
  const text = useRef({ previousValue: "", currentValue: "" });
  const [loading, setLoading] = useState(true);
  function setText(obj) {
    text.current = obj;
    setLoading(!loading);
  }
  useEffect(() => {
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }, []);

  return (
    <div className="w-full mt-2">
      <div className="flex flex-wrap items-center justify-center max-w-md bg-gray-800 mx-auto border-8 border-gray-800 rounded-lg">
        <Textarea setText={setText} text={text} />
        <KeyPad setText={setText} text={text} />
      </div>
    </div>
  );
}

export default App;