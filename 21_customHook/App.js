import React, { useState, useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function reducer( state, action ) {

  switch( action.type ) {
    case 'CREATE':
      return {
        inputs: initialState.inputs,
        users: [...state.users, action.user]
      };
    case 'REMOVE':
      return {
        ...state,
        users: state.users.filter( u => u.id !== action.user_id ),
      };
    case 'TOGGLE':
      return {
        ...state,
        users: state.users.map( u =>
          u.id === action.user_id ? {...u, active: !u.active}:u
        )
      };
    case 'CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}

function countActiveUsers( users ) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter( user => user.active ).length;
}

const initialState = {
  inputs: {
    email: '',
    username: '',
  },
  users: [
    {
      id: 1,
      username: 'vlpt',
      email: 'some.email.to.vlpt@mail.com',
      active: true,
    },
    {
      id: 2,
      username: 'anony',
      email: 'anonymous@mail.com',
      active: false,
    },
    {
      id: 3,
      username: 'maetdol',
      email: 'maetdol@github.com',
      active: false,
    },
  ],
}

function App() {

  const [state, dispatch] = useReducer( reducer, initialState );
  const { users } = state;
  const { username, email } = state.inputs

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE',
      user: {
        id: nextId.current,
        username,
        email,
        active: false,
      }
    });
    nextId.current += 1;
  }, [username, email]);
  
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE',
      name,
      value
    });
  }, []);

  const onRemove = useCallback(( user_id ) => {
    dispatch({
      type: 'REMOVE',
      user_id
    });
  }, []);

  const onToggle = useCallback(( user_id ) => {
    dispatch({
      type: 'TOGGLE',
      user_id
    });
  }, []);

  const count = useMemo(() => countActiveUsers( users ), [users]);
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={ onChange }
        onCreate={ onCreate }
      />
      <UserList 
        users={ users }
        onRemove={ onRemove }
        onToggle={ onToggle }
      />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
