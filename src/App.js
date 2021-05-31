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
      <div className="flex flex-wrap items-center justify-center max-w-md bg-orange-200 mx-auto border-4 border-orange-500 rounded-lg">
        <Textarea setText={setText} text={text} />
        <KeyPad setText={setText} text={text} />
      </div>
    </div>
  );
}

export default App;