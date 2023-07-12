import React from 'react';
import AppRoutes from './AppRoutes';
import AppNavBar from './common/AppNavBar';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavBar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
