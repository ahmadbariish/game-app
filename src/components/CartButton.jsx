import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, cartCount, removeFromCart } = useCart();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-200 hover:text-white transition-colors"
            >
                <FaShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-96 bg-[#2d3748] rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="p-4 border-b border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-100">Your Cart ({cartCount})</h2>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {cartItems.length === 0 ? (
                                <div className="p-4 text-gray-400 text-center">
                                    Your cart is empty
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-700">
                                    {cartItems.map(game => (
                                        <div key={game.id} className="p-4 flex items-start gap-4">
                                            <img
                                                src={game.background_image}
                                                alt={game.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-gray-100 font-medium truncate">
                                                    {game.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(game.id)}
                                                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartButton; 