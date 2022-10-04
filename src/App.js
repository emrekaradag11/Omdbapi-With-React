import Home from './components/Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
