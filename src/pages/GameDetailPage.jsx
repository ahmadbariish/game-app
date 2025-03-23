import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api-client';
import Spinner from '../components/spinner';
import PlatformIconList from '../components/PlatformIconList';
import CriticScore from '../components/CriticScore';
import getCroppedImageUrl from '../services/image-url';

const GameDetailPage = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/games/${slug}`);
                setGame(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [slug]);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!game) return null;

    return (
        <div className="min-h-screen bg-[#1f2937] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/" 
                    className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-200 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Games
                </Link>

                <div className="bg-[#2d3748] rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-[400px] overflow-hidden">
                        <img 
                            src={getCroppedImageUrl(game.background_image)} 
                            alt={game.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d3748]/90 to-transparent p-6">
                            <h1 className="text-4xl font-bold text-gray-100 mb-2">{game.name}</h1>
                            <div className="flex items-center gap-4">
                                <PlatformIconList platforms={game.parent_platforms?.map(p => p.platform)} />
                                <CriticScore score={game.metacritic} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#2d3748] rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-100">About</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {game.description_raw}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#2d3748] rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-100">Game Info</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400">Release Date</h3>
                                    <p className="mt-1 text-base font-medium text-gray-200">
                                        {new Date(game.released).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400">Rating</h3>
                                    <div className="mt-1 flex items-center">
                                        <span className="text-base font-medium text-gray-200">{game.rating}/5</span>
                                        <span className="ml-2 text-sm text-gray-400">
                                            ({game.ratings_count} ratings)
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400">Genres</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {game.genres?.map(genre => (
                                            <span 
                                                key={genre.id}
                                                className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-900/30 rounded-full"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {game.publishers?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400">Publishers</h3>
                                        <div className="mt-2">
                                            {game.publishers.map(publisher => (
                                                <div 
                                                    key={publisher.id}
                                                    className="text-base font-medium text-gray-200"
                                                >
                                                    {publisher.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {(game.metacritic || game.playtime) && (
                            <div className="bg-[#2d3748] rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-100">Stats</h2>
                                <div className="space-y-4">
                                    {game.metacritic && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Metacritic Score</h3>
                                            <div className="mt-1">
                                                <CriticScore score={game.metacritic} />
                                            </div>
                                        </div>
                                    )}
                                    {game.playtime > 0 && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Average Playtime</h3>
                                            <p className="mt-1 text-base font-medium text-gray-200">
                                                {game.playtime} hours
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage; 