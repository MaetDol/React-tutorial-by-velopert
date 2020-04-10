import { useCallback, useReducer } from 'react';

function reducer( state, action ) {
  switch( action.type ) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value
      };
    case 'RESET':
      return Object.keys( state )
        .reduce((acc, current) => (acc[current] = '', acc), {});
    default:
      return state;
  }
}

function useInputs( initialForm ) {
  const [form, dispatch] = useReducer( reducer, initialForm );
  const reset = useCallback(() => dispatch({
    type: 'RESET'
  }), []);
  const onChange = useCallback(({target}) => dispatch({
    type: 'CHANGE',
    name: target.name,
    value: target.value
  }), []);
  return [form, onChange, reset];
}

export default useInputs;