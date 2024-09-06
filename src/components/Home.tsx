import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

// Define TypeScript interfaces for user data
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <Link to="/create">Create User</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.phone}
            <Link to={`/user/${user.id}`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  function handleDelete(id: number) {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => {
        setError('Failed to delete user');
      });
  }
}

export default Home;
