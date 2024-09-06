import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Define TypeScript interface for user data
interface User {
  name: string;
  email: string;
  phone: string;
}

interface UserFormProps {
  isEditing: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ isEditing }) => {
  const [user, setUser] = useState<User>({ name: '', email: '', phone: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (isEditing && id) {
      axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          setError('Failed to fetch user');
        });
    }
  }, [id, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `https://jsonplaceholder.typicode.com/users/${id}` : 'https://jsonplaceholder.typicode.com/users';
    const method = isEditing ? 'PUT' : 'POST';

    axios({ method, url, data: user })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setError('Failed to save user');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isEditing ? 'Edit User' : 'Create User'}</h1>
      {error && <div>{error}</div>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default UserForm;
