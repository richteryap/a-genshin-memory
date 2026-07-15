import { Routes, Route } from "react-router-dom"; 
import ScrollToHash from './components/ScrollToHash.jsx'; 
import useScrollSpy from "./hooks/useScrollSpy.js"; 
import Home from './pages/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Contact from './components/Contact/Contact.jsx'; 

function App() {   
  const sectionIds = ['profile'];   
  useScrollSpy(sectionIds);   

  return (     
    <>       
      <ScrollToHash />       
      <Nav />       
      <Routes>         
        <Route path="/" element={           
          <div className="pt-[60px] pb-20 px-4 md:px-8 mx-auto no-underline text-inherit">             
            <section id="profile">               
              <Home />             
            </section>           
          </div>         
        } />         
        <Route path="/contact/" element={<Contact />} />       
      </Routes>     
    </>   
  );
}

export default App;