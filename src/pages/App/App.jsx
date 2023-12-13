import { useState } from 'react';
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import { Route, Routes } from "react-router-dom"
import { getUser } from "../../utilities/users-service"

export default function App() {
  const [user, setUser] = useState(getUser())

  return (
    <>
      <main className="App">
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path='/orders' element={<OrderHistoryPage />} />
              <Route path='/orders/new' element={<NewOrderPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </>
  );
}