import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (game) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === game.id);
            if (existingItem) {
                return prevItems;
            }
            return [...prevItems, { ...game, addedAt: new Date().toISOString() }];
        });
    };

    const removeFromCart = (gameId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
    };

    const isInCart = (gameId) => {
        return cartItems.some(item => item.id === gameId);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            isInCart,
            clearCart,
            cartCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
}; 