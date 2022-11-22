import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import User from './pages/User.jsx';
import Home from './pages/Home.jsx';
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
<>
<Routes  >
  <Route path='/' element={<Home/>} />
  <Route path='/:id' element={<User/>} />
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
</>
  );
}

export default App;
