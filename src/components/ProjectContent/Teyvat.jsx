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
    return (
        <>
            <ScrollToHash />
            <div className="teyvat-container">
                <section id="mondstadt">
                    <Mondstadt />
                </section>
                <section id="liyue">
                    <Liyue />
                </section>
                <section id="inazuma">
                    <Inazuma />
                </section>
                <section id="sumeru">
                    <Sumeru />
                </section>
                <section id="fontaine">
                    <Fontaine />
                </section>
                <section id="natlan">
                    <Natlan />
                </section>
                <section id="nod-krai">
                    <Nod_krai />
                </section>
            </div>
        </>
    );
}

export default Teyvat;