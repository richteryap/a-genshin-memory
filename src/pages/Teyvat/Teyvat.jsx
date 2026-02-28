import { useState, useEffect } from 'react';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import ScrollToHash from "../../components/ScrollToHash.jsx";
import useScrollSpy from "../../hooks/useScrollSpy.js";
import useAutoClose from '../../hooks/useAutoClose.js';
import Regions from '../../components/Regions/Regions.jsx';
import './Teyvat.css';

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
                    <Regions regionId="mondstadt" title="Mondstadt" isEditing={isEditorMode} />
                </section>
                <section id="liyue">
                    <Regions regionId="liyue" title="Liyue" isEditing={isEditorMode} />
                </section>
                <section id="inazuma">
                    <Regions regionId="inazuma" title="Inazuma" isEditing={isEditorMode} />
                </section>
                <section id="sumeru">
                    <Regions regionId="sumeru" title="Sumeru" isEditing={isEditorMode} />
                </section>
                <section id="fontaine">
                    <Regions regionId="fontaine" title="Fontaine" isEditing={isEditorMode} />
                </section>
                <section id="natlan">
                    <Regions regionId="natlan" title="Natlan" isEditing={isEditorMode} />
                </section>
                <section id="nod-krai">
                    <Regions regionId="nod-krai" title="Nod-Krai" isEditing={isEditorMode} />
                </section>
            </div>
        </>
    );
}

export default Teyvat;