import { useState, useEffect } from "react";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [gameQuery, setGameQuery] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const root = document.documentElement;

    useEffect(() => {
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-[#1f2937] text-gray-200">
            <NavBar 
                toggleTheme={toggleTheme} 
                theme={theme} 
                onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
                toggleSidebar={toggleSidebar}
            />
            
            <div className="container mx-auto">
                <div className="flex">
                    <aside 
                        className={`
                            lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#1f2937] shadow-xl 
                            transform transition-transform duration-300 ease-in-out overflow-y-auto
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        <div className="sticky top-0 bg-[#1f2937] z-10 p-4 border-b border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-200">Genres</h2>
                                <button 
                                    onClick={toggleSidebar}
                                    className="p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <SideBar 
                                onSelectGenre={(genre) => {
                                    setGameQuery({ ...gameQuery, genre });
                                    setIsSidebarOpen(false);
                                }} 
                            />
                        </div>
                    </aside>

                    <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-[#1f2937] rounded-lg border border-gray-700">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-200 mb-4">Genres</h2>
                            <SideBar onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0 p-4">
                        <MainContent
                            selectPlatform={gameQuery.platform}
                            selectSortOrder={gameQuery.sortOrder}
                            selectGenre={gameQuery.genre}
                            searchText={gameQuery.searchText}
                            onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
                            onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })}
                        />
                    </main>
                </div>
            </div>

            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default App;
