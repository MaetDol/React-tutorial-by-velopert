import React, { useEffect } from 'react';

const User = React.memo( ({ user, onRemove, onToggle }) => {

  useEffect(() => {
    console.log('user 생성');
    console.log( user );
    return () => {
      console.log('user 제거');
      console.log( user );
    }
  }, []);
console.log('create User ')
  return (
    <div>
      <b 
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black',
        }}
        onClick={ () => onToggle( user.id ) }
      >
        { user.username }
      </b>
      &nbsp;
      <span>({ user.email })</span>
      <button onClick={ () => onRemove( user.id ) }>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
console.log('userlist')
  return (
    <div>
      {users.map( user => (
        <User 
          user={ user } 
          key={ user.id } 
          onRemove={ onRemove } 
          onToggle={ onToggle }
        />
    ))}
    </div>
  );
}

export default React.memo( UserList );