import React, { useState } from 'react';

function Counter() {

  let [number, setNumber] = useState(0);

  const increase = () => {
    setNumber(number + 1);
  };

  const decrease = () => {
    // 함수를 인자로 넘겨줘도 된다
    setNumber( num => num-1 );
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
}

export default Counter;