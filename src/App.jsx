import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

import { Header } from './components/Header'
import { EditUsers } from './components/pages/EditUsers'
import { Users } from './components/pages/Users'

import initialUsersData from './data/users.json'

import './App.css'

export const App = () => {
  const [allUsers, setAllUsers] = useState(initialUsersData);
  
  const handleUserUpdate = (updatedUser, oldName) => {
    setAllUsers(prev =>
      prev.map(user =>
        user.name === oldName ? updatedUser : user
      )
    );
  };
  
  const handleUserDelete = (userName) => {
    setAllUsers(prev => prev.filter(user => user.name !== userName));
  };

  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />

          <Route path='/edit' element={<EditUsers users={allUsers} onUserUpdate={handleUserUpdate} />} />
          <Route path='/users' element={<Users users={allUsers} onDeleteUser={handleUserDelete} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}