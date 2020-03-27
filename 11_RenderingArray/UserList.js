import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{ user.username }</b> <span>({ user.email })</span>
    </div>
  );
}

function UserList() {

  const users = [
    {
      id: 1,
      username: 'vlpt',
      email: 'some.email.to.vlpt@mail.com',
    },
    {
      id: 2,
      username: 'anony',
      email: 'anonymous@mail.com',
    },
    {
      id: 3,
      username: 'maetdol',
      email: 'maetdol@github.com',
    },
  ];

  return (
    <div>
      {users.map( user => (
        <User user={ user } key={ user.id } />
      ))}
    </div>
  );
}

export default UserList;