import { Routes, Route } from "react-router-dom";
import ScrollToHash from './components/ScrollToHash.jsx';
import useScrollSpy from "./hooks/useScrollSpy.js";
import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import Titles from './components/Titles.jsx'
import Travels from './components/Travels.jsx'
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import Teyvat from './pages/Teyvat.jsx';
import './App.css'

function App() {
  const sectionIds = ['home', 'titles', 'travels'];
  useScrollSpy(sectionIds);
  return (
    <>
      <ScrollToHash />
      <Nav />
      <Routes>
        <Route path="/" element={
          <div className="app-body">
            <section id="home">
              <Home />
            </section>
            <section id="titles">
              <Titles />
            </section>
            <section id="travels">
              <Travels />
            </section>
          </div>
        } />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/teyvat/" element={<Teyvat />} />
        <Route path="/admin-login/" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
