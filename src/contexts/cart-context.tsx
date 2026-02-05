"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
}

interface CartContextType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: string, color?: string, size?: string) => void;
	updateQuantity: (
		id: string,
		quantity: number,
		color?: string,
		size?: string
	) => void;
	clearCart: () => void;
	total: number;
	cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load cart from localStorage on mount
	useEffect(() => {
		try {
			const savedCart = localStorage.getItem("cart");
			if (savedCart) {
				setItems(JSON.parse(savedCart));
			}
		} catch (error) {
			console.error("Failed to load cart from localStorage", error);
		}
		setIsLoaded(true);
	}, []);

	// Save cart to localStorage whenever items change
	useEffect(() => {
		if (isLoaded) {
			try {
				localStorage.setItem("cart", JSON.stringify(items));
			} catch (error) {
				console.error("Failed to save cart to localStorage", error);
			}
		}
	}, [items, isLoaded]);

	const addItem = (newItem: CartItem) => {
		setItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(item) =>
					item.id === newItem.id &&
					item.color === newItem.color &&
					item.size === newItem.size
			);

			if (existingItemIndex > -1) {
				const newItems = [...prevItems];
				newItems[existingItemIndex].quantity += newItem.quantity;
				return newItems;
			}

			return [...prevItems, newItem];
		});
	};

	const removeItem = (id: string, color?: string, size?: string) => {
		setItems((prevItems) =>
			prevItems.filter(
				(item) =>
					!(
						item.id === id &&
						(color ? item.color === color : true) &&
						(size ? item.size === size : true)
					)
			)
		);
	};

	const updateQuantity = (
		id: string,
		quantity: number,
		color?: string,
		size?: string
	) => {
		if (quantity < 1) return;
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id &&
				(color ? item.color === color : true) &&
				(size ? item.size === size : true)
					? { ...item, quantity }
					: item
			)
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
				total,
				cartCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
