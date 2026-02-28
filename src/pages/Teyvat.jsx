import { useState, useEffect } from 'react';
import ScrollToHash from "../components/ScrollToHash.jsx";
import useScrollSpy from "../hooks/useScrollSpy.js";
import useAutoClose from '../hooks/useAutoClose.js';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import Mondstadt from '../components/Mondstadt.jsx';
import Liyue from '../components/Liyue.jsx';
import Inazuma from '../components/Inazuma.jsx';
import Sumeru from '../components/Sumeru.jsx';
import Fontaine from '../components/Fontaine.jsx';  
import Natlan from '../components/Natlan.jsx';
import Nod_Krai from '../components/Nod_Krai.jsx';
import '../style/Teyvat.css';

const Teyvat = () => {
    const sectionIds = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'nod-krai'];
    useScrollSpy(sectionIds);

    const [isEditorMode, setIsEditorMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useAutoClose(isSidebarOpen, () => setSidebarOpen(false), 4000);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            if (!currentUser) {
                setIsEditorMode(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <ScrollToHash />
            <div className="teyvat-container">
                <div className={`editor-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!isSidebarOpen)} aria-label="Toggle Sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="arrow-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <div className='sidebar-content'>
                        <div className="sidebar-sections">
                            <a href="/teyvat#mondstadt">Mondstadt</a>
                            <a href="/teyvat#liyue">Liyue</a>
                            <a href="/teyvat#inazuma">Inazuma</a>
                            <a href="/teyvat#sumeru">Sumeru</a>
                            <a href="/teyvat#fontaine">Fontaine</a>
                            <a href="/teyvat#natlan">Natlan</a>
                            <a href="/teyvat#nod-krai">Nod-Krai</a>
                        </div>
                        <div className='editor-container'>
                            <div className="editor-mode-toggle">
                                <span>Editor Mode: </span>
                                <div className="toggle-track">
                                    <input type="checkbox" id="editor-mode-toggle" checked={isEditorMode} disabled={!user} onChange={() => setIsEditorMode(!isEditorMode)} />
                                    <label htmlFor="editor-mode-toggle" className={!user ? "toggle-disabled" : ""}></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="mondstadt">
                    <Mondstadt isEditing={isEditorMode}/>
                </section>
                <section id="liyue">
                    <Liyue isEditing={isEditorMode}/>
                </section>
                <section id="inazuma">
                    <Inazuma isEditing={isEditorMode}/>
                </section>
                <section id="sumeru">
                    <Sumeru isEditing={isEditorMode}/>
                </section>
                <section id="fontaine">
                    <Fontaine isEditing={isEditorMode}/>
                </section>
                <section id="natlan">
                    <Natlan isEditing={isEditorMode}/>
                </section>
                <section id="nod-krai">
                    <Nod_Krai isEditing={isEditorMode}/>
                </section>
            </div>
        </>
    );
}

export default Teyvat;