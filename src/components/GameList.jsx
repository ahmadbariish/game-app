import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import GameCard from "./GameCard";
import Spinner from "./spinner";

const GameList = ({ selectPlatform, selectGenre, selectSortOrder, searchText }) => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        apiClient
            .get("/games", {
                params: {
                    genres: selectGenre?.id,
                    parent_platforms: selectPlatform?.id,
                    ordering: selectSortOrder,
                    search: searchText,
                },
                signal: controller.signal,
            })
            .then((res) => {
                setGames(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "CanceledError") return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, [selectPlatform?.id, selectGenre?.id, selectSortOrder, searchText]);

    if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

    if (isLoading) return <Spinner />;

    return (
        <div className="flex flex-col space-y-4 px-4">
            {games.length === 0 ? (
                <p className="text-gray-400 text-center p-4">No games found</p>
            ) : (
                games.map((game) => (
                    <div key={game.id} className="w-full max-w-2xl mx-auto">
                        <GameCard game={game} />
                    </div>
                ))
            )}
        </div>
    );
};

export default GameList;
