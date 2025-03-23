import GameList from "./GameList";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import { GameHeading } from "./GameHeading";

const MainContent = ({ selectGenre, onSelectPlatform, selectPlatform, selectSortOrder, onSelectSortOrder, searchText }) => {
    return (
        <div className="p-4">
            <div className="mb-8">
                <GameHeading selectGenre={selectGenre} selectPlatform={selectPlatform} />
            </div>
            
            <div className="mb-8">
                <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-auto">
                        <PlatformSelector 
                            onSelectPlatform={onSelectPlatform} 
                            selectPlatform={selectPlatform} 
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <SortSelector 
                            onSelectSortOrder={onSelectSortOrder} 
                            selectSortOrder={selectSortOrder} 
                        />
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                <GameList 
                    selectPlatform={selectPlatform} 
                    selectGenre={selectGenre} 
                    selectSortOrder={selectSortOrder} 
                    searchText={searchText} 
                />
            </div>
        </div>
    );
};

export default MainContent;
