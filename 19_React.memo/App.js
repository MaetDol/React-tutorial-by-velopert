import React, { useState, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers( users ) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter( user => user.active ).length;
}

function App() {

  const initUsers = [
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
  ];
  const [users, setUsers] = useState(initUsers);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const { username, email } = inputs;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    setUsers( users => [
      ...users,
      {
        id: nextId.current,
        username,
        email,
        active: false,
      }
    ]);
    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);
  
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const onRemove = useCallback(( user_id ) => {
    setUsers( users => users.filter( u => u.id !== user_id ));
  }, []);

  const onToggle = useCallback(( user_id ) => {
    setUsers( users => users.map( u => u.id === user_id ? { ...u, active: !u.active }:u ));
  }, []);

  const count = useMemo(() => countActiveUsers( users ), [users] );
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
