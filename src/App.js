import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DashboardMain from './pages/dashboard/DashboardMain';
import AuthMain from './pages/auth/AuthMain';
import { DataProvider } from './context/DataContext';
import {SignedIn,UserButton} from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <header className='p-2'>
        <div className="navbar">
          <SignedIn className='userBtn'>
              <UserButton className='userBtn'/>
          </SignedIn>
        </div>
      </header>
      <DataProvider>
        <Routes>
          
          <Route path='/' element={<DashboardMain/>} />
          <Route path='/auth' element={<AuthMain/>} />
        </Routes>
        </DataProvider>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
