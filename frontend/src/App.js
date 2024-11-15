import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import NewJournalEntry from './pages/NewJournalEntry';

function App() {

  const [onPressed, setOnPressed] = useState("/"); // Default to Home

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onPressed={onPressed} setOnPressed={setOnPressed} />
          <div className="pages">
            <Routes>
              <Route 
              path="/"
              element={<Home />}
              />
              <Route 
              path="/newentry"
              element={<NewJournalEntry onPressed={onPressed} setOnPressed={setOnPressed}/>}
              />
              {/* Add other routes here */}
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
