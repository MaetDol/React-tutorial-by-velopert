import React, { useReducer } from 'react';

function reducer( state, action ) {
  console.log( action )
  switch( action.type ) {
    case 'INCREMENT':
      return state +1;
    case 'DECREMENT':
      return state -1;
    default:
      return state;
  }
}

function Counter() {

  const [number, dispatch] = useReducer( reducer, 0 );
  const increase = () => {
    dispatch({ type: 'INCREMENT'});
  };
  const decrease = () => {
    dispatch({ type: 'DECREMENT'});
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={ increase }>+1</button>
      <button onClick={ decrease }>-1</button>
    </div>
  );
}

export default Counter;