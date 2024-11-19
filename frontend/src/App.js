import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import NewJournalEntry from './pages/NewJournalEntry';
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyJournals from './pages/MyJournals';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const [onPressed, setOnPressed] = useState("/"); // Default to Home
  const location = useLocation()
  const { user } = useAuthContext()

  const showNavbar = location.pathname != '/login' && location.pathname != '/signup'

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        {showNavbar && <Navbar onPressed={onPressed} setOnPressed={setOnPressed} />}
          <div className="pages">
            <Routes>
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/home" />}
              />
              <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/home" />}
              />
              <Route 
              path="/home"
              element={user ? <Home /> : <Navigate to='/login' />}
              />
              <Route 
              path="/"
              element={<Navigate to="/login" />}
              />
              <Route 
              path="/newentry"
              element={user ? <NewJournalEntry onPressed={onPressed} setOnPressed={setOnPressed}/> : <Navigate to='/login' />}
              />
              <Route 
              path="/myjournals"
              element={user ? <MyJournals /> : <Navigate to='/login' />}
              />
              {/* Add other routes here */}
            </Routes>
          </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
