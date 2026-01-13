import { useState, useEffect } from 'react';
import ScrollToHash from "../PageAssist/ScrollToHash.jsx";
import useScrollSpy from "../PageAssist/useScrollSpy.js";
import './Teyvat.css';
import Mondstadt from './Mondstadt.jsx';
import Liyue from './Liyue.jsx';
import Inazuma from './Inazuma.jsx';
import Sumeru from './Sumeru.jsx';
import Fontaine from './Fontaine.jsx';
import Natlan from './Natlan.jsx';
import Nod_krai from './Nod-krai.jsx';

const Teyvat = () => {
    const sectionIds = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'nod-krai'];
    useScrollSpy(sectionIds);

    const [isEditorMode, setIsEditorMode] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isSidebarOpen) return;

        let timeoutId;

        const closeSidebar = () => {
            setSidebarOpen(false);
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(closeSidebar, 4000);
        };

        resetTimer();

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, [isSidebarOpen]);

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
                            <a href="/teyvat#nod-krai">Nod-krai</a>
                        </div>
                        <div className='editor-container'>
                            <div className="editor-mode-toggle">
                                <span>Editor Mode: </span>
                                <div className="toggle-track">
                                    <input type="checkbox" id="editor-mode-toggle" checked={isEditorMode} onChange={() => setIsEditorMode(!isEditorMode)} />
                                    <label htmlFor="editor-mode-toggle"></label>
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
                    <Nod_krai isEditing={isEditorMode}/>
                </section>
            </div>
        </>
    );
}

export default Teyvat;