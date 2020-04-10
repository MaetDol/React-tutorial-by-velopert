import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo( ({ user }) => {
  const dispatch = useContext( UserDispatch );

  return (
    <div>
      <b 
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={ () => 
          dispatch({ type: 'TOGGLE', user_id: user.id }) }
      >
        { user.username }
      </b>
      &nbsp;
      <span>({ user.email })</span>
      <button onClick={ () => 
        dispatch({ type: 'REMOVE', user_id: user.id }) 
      }>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map( user => (
        <User 
          user={ user } 
          key={ user.id } 
        />
    ))}
    </div>
  );
}

export default React.memo( UserList );