//rafce
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ZoneScreen from './screens/ZoneScreen';
import CountryScreen from './screens/CountryScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import { AuthContext } from "./context/AuthContext";
import Protected from './components/Protected';


function App() {
  const [currency, setCurrency] = useState('GBP');
  const [user, setUser] = useState('');
  console.log(user)

  return (
    <Router>
      <AuthContext>
      <Header setValue={setCurrency} setLoggedIn={setUser}/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen currency={currency}/>} />
            <Route path='/admin' element={<Protected isSignedIn={user}><AdminScreen /></Protected>} />
            <Route path='/create' element={<Protected isSignedIn={user}><CreateScreen /></Protected>} />
            <Route path='/edit/:id' element={<Protected isSignedIn={user}><EditScreen /></Protected>} />
            <Route path='/zones/:id' element={<ZoneScreen currency={currency}/>} />
            <Route path='/countries/:id' element={<CountryScreen currency={currency}/>} />
            <Route path='/login' element={<LoginScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      </AuthContext>
    </Router>
  )
}

export default App
