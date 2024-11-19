import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import NewJournalEntry from './pages/NewJournalEntry';
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const [onPressed, setOnPressed] = useState("/"); // Default to Home
  const location = useLocation()

  const showNavbar = location.pathname != '/login' && location.pathname != '/signup'

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        {showNavbar && <Navbar onPressed={onPressed} setOnPressed={setOnPressed} />}
          <div className="pages">
            <Routes>
            <Route 
              path="/login"
              element={<Login />}
              />
              <Route 
              path="/signup"
              element={<Signup />}
              />
              <Route 
              path="/home"
              element={<Home />}
              />
              <Route 
              path="/"
              element={<Navigate to="/login" />}
              />
              <Route 
              path="/newentry"
              element={<NewJournalEntry onPressed={onPressed} setOnPressed={setOnPressed}/>}
              />
              {/* Add other routes here */}
            </Routes>
          </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
