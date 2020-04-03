import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  const style = {
    fontSize: 20,
    color: 'red',
  };
  return (
    <>
      {/* 주석! */}
      <div
        className="div"
        style={
          style
          // 주석?
        }
        // 이것도 주석?
      >
        DIV!
      </div>

      <Wrapper>
        <Hello name="홍길동" color="gray" />
        <Hello />
      </Wrapper>
    </>
  );
}

export default App;