import Logo from "./Logo";
import LogoImag from "../assets/images/logo.webp";
import SearchInput from "./SearchInput";
import { BsSun, BsMoonStars } from "react-icons/bs";
import CartButton from "./CartButton";

const NavBar = ({ toggleTheme, theme, onSearch, toggleSidebar }) => {
    return (
        <nav className="bg-[#2d3748] shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center h-16">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden -ml-1 p-2 rounded-md hover:bg-gray-700 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        
                        <div className="flex-shrink-0">
                            <Logo image={LogoImag} text="Game App" className="h-8 w-auto" />
                        </div>
                    </div>

                    <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                        <div className="w-full">
                            <SearchInput onSearch={onSearch} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-200 hover:text-white transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <BsSun className="w-5 h-5" /> : <BsMoonStars className="w-5 h-5" />}
                        </button>
                        <CartButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
