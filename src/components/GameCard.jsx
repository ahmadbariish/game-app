import { Link } from "react-router-dom";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import { Emoji } from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const GameCard = ({ game }) => {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const inCart = isInCart(game.id);

    const handleCartClick = (e) => {
        e.preventDefault();
        if (inCart) {
            removeFromCart(game.id);
        } else {
            addToCart(game);
        }
    };

    return (
        <Link to={`/games/${game.slug}`} className="w-full md:w-[400px] lg:w-[500px] block">
            <div className="relative group h-full bg-[#2d3748] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative w-full pt-[56.25%]">
                    <img
                        src={getCroppedImageUrl(game.background_image)}
                        alt={game.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d3748] to-transparent h-16"></div>
                    
                    <button
                        onClick={handleCartClick}
                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 text-white hover:bg-gray-800 transition-colors"
                    >
                        {inCart ? <FaHeart className="w-5 h-5 text-red-500" /> : <FaRegHeart className="w-5 h-5" />}
                    </button>
                </div>
                
                <div className="p-4">
                    <div className="flex justify-between items-start gap-4 mb-2">
                        <h2 className="text-lg font-semibold text-gray-100 line-clamp-1 flex-1">
                            {game.name}
                        </h2>
                        {game.metacritic && <CriticScore score={game.metacritic} />}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <PlatformIconList platforms={game.parent_platforms?.map(p => p.platform)} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Emoji rating={game.rating_top} />
                        <span className="text-sm text-gray-400">
                            {game.released && new Date(game.released).getFullYear()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
