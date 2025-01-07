import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameList = () => {
    const { games, error } = useGames();

    return (
        <>
            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Danger alert!</span> {error}
                </div>
            )}
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </>
    );
};

export default GameList;
