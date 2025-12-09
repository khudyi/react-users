import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Header } from './components/Header'
import { EditUsers } from './components/pages/EditUsers'
import { Users } from './components/pages/Users'

import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />

          <Route path='/edit' element={<EditUsers />} />
          <Route path='/users' element={<Users />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}