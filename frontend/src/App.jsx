//rafce
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ZoneScreen from './screens/ZoneScreen';
import CountryScreen from './screens/CountryScreen';


function App() {
  const [currency, setCurrency] = useState('GBP');

  return (
    <Router>
      <Header setValue={setCurrency}/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen currency={currency}/>} />
            <Route path='/zones/:id' element={<ZoneScreen currency={currency}/>} />
            <Route path='/countries/:id' element={<CountryScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
