const Nav = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-[60px] flex justify-center items-center bg-[var(--bg-color)] shadow-[0_2px_10px_var(--shadow-color)] z-[1000]">
            <div className="flex justify-center items-center gap-8 transition-all duration-300 ease-in-out">
                <a href="/#profile" className="no-underline text-[var(--text-color)] text-base font-medium relative transition-colors duration-300 hover:text-[#ffd700] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:w-0 after:h-[2px] after:bg-[#ffd700] after:transition-all after:duration-300 hover:after:w-full">
                    Profile
                </a>
                <a href="/contact" className="no-underline text-[var(--text-color)] text-base font-medium relative transition-colors duration-300 hover:text-[#ffd700] after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:w-0 after:h-[2px] after:bg-[#ffd700] after:transition-all after:duration-300 hover:after:w-full">
                    Contact
                </a>
            </div>
        </div>
    );
};

export default Nav;