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
import EditScreen from './screens/AdminScreen';
import { AuthContext } from "./context/AuthContext";


function App() {
  const [currency, setCurrency] = useState('GBP');
  //console.log(currency)

  return (
    <Router>
      <AuthContext>
      <Header setValue={setCurrency}/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen currency={currency}/>} />
            <Route path='/admin' element={<AdminScreen />} />
            <Route path='/create' element={<CreateScreen />} />
            <Route path='/edit' element={<EditScreen />} />
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
