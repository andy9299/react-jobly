import React from 'react';
import AppRoutes from './AppRoutes';
import AppNavBar from './common/AppNavBar';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavBar />
        <div className='pt-5'>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
