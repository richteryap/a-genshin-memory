import { Routes, Route } from "react-router-dom";
import ScrollToHash from './components/ScrollToHash.jsx';
import useScrollSpy from "./hooks/useScrollSpy.js";
import Home from './pages/Home/Home.jsx'
import Nav from './components/Nav/Nav.jsx'
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

function App() {
  const sectionIds = ['profile'];
  useScrollSpy(sectionIds);
  return (
    <>
      <ScrollToHash />
      <Nav />
      <Routes>
        <Route path="/" element={
          <div className="app-body">
            <section id="profile">
              <Home />
            </section>
          </div>
        } />
        <Route path="/contact/" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
