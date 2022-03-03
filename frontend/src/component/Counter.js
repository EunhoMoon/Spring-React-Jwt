import React, { useState } from "react";

const Counter = () => {
  const [countNum, setCountNum] = useState(0);

  const addCount = () => {
    setCountNum(countNum + 1);
  };

  return (
    <div>
      <span>Counter : {countNum}</span>
      <button type="button" onClick={addCount}>
        Add Count
      </button>
    </div>
  );
};

export default Counter;
