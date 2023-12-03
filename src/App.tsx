import React from 'react';
import './App.css';

import Navbar from './components/NavBar';
import { About } from './pages/About'
import { DailyExpenses } from './pages/DailyExpenses';
import { MonthlyExpenses } from './pages/MonthlyExpenses';
import { Visualizations } from './pages/Visualizations';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route path="about" element={<About></About>}></Route>
          <Route path="daily" element={<DailyExpenses></DailyExpenses>}></Route>
          <Route path="monthly" element={<MonthlyExpenses></MonthlyExpenses>}></Route>
          <Route path="visualizations" element={<Visualizations></Visualizations>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
