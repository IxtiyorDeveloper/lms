import React, { useRef } from "react";
import { iframeTest } from "../components/printD";

const Print = () => {
  const divRef = useRef(null);

  const print = (id: string) => {
    iframeTest(divRef);
    // iframeTest(window.document.getElementById(id));
  };

  return (
    <div id="asd" ref={divRef} style={{ border: "1px solid gray" }}>
      <h1>
        Lorem ipsum dolor example, lorem ipsum dolor example, lorem ipsum dolor
        example, lorem ipsum dolor example, lorem ipsum dolor example, lorem
        ipsum dolor example, lorem ipsum dolor example, lorem ipsum dolor
        example, lorem ipsum dolor example
      </h1>
      <button onClick={() => print("asd")}>Print</button>
    </div>
  );
};

export default Print;
