import React, { useMemo, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function reducer( state, action ) {

  switch( action.type ) {
    case 'CREATE':
      return {
        users: state.users.concat( action.user )
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

export const UserDispatch = React.createContext(null);

function App() {

  const [state, dispatch] = useReducer( reducer, initialState );
  const { users } = state;

  const count = useMemo(() => countActiveUsers( users ), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser/>
      <UserList users={users}/>
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
