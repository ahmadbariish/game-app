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
        <div className="relative">
            <Link to={"/games/" + game.slug}>
                <div className="bg-[#202020] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="relative aspect-[16/9]">
                        <img
                            src={getCroppedImageUrl(game.background_image)}
                            alt={game.name}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <PlatformIconList
                                platforms={game.parent_platforms?.map((p) => p.platform)}
                            />
                            <CriticScore score={game.metacritic} />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">
                            {game.name}
                        </h2>
                        <div className="flex items-center justify-between">
                            <Emoji rating={game.rating_top} />
                            <span className="text-sm text-gray-400">
                                {game.released && new Date(game.released).getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleCartClick}
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-900/80 text-white hover:bg-gray-800 transition-colors z-10"
            >
                {inCart ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                    <FaRegHeart className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default GameCard;
