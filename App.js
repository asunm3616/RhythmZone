import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';  // Ensure `ani` is exported as `Ani`
import { Login1 } from './components/Login1';
import { Signup } from './components/Signup';
import { Adminlog } from './components/Adminlog';
import { Adminpage } from './components/Adminpage';
import { Hindi1 } from './components/Hindi1';
import { Japanese } from './components/Japanese';
import { Englishsongs } from './components/Englishsongs';
import { Search } from './components/Search';
import { Tamil } from './components/Tamil';
function App() {
  return (
  <BrowserRouter>
    <>
      <Routes>
         <Route path='/' element={< Login1 />} /> 
      <Route path='/Home' element={< Home />}/>
      <Route path='/Englishsongs' element={< Englishsongs />}/>
      <Route path='Signup' element={< Signup />}/>
      <Route path='Adminlog' element={< Adminlog />}/>
      <Route path='Adminpage' element={< Adminpage />}/>
      <Route path='Hindi1' element={< Hindi1 />}/>
      <Route path='Japanese' element={< Japanese />}/>
      <Route path='Search' element={< Search />}/>
      <Route path='/Tamil' element={< Tamil />}/>
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;