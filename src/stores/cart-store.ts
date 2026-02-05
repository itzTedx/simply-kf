import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
}

interface CartStore {
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

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [] as CartItem[],

			addItem: (newItem: CartItem) => {
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(item) =>
							item.id === newItem.id &&
							item.color === newItem.color &&
							item.size === newItem.size
					);

					let newItems;

					if (existingItemIndex > -1) {
						newItems = [...state.items];
						newItems[existingItemIndex].quantity += newItem.quantity;
					} else {
						newItems = [...state.items, newItem];
					}

					const cartCount = newItems.reduce(
						(sum, item) => sum + item.quantity,
						0
					);

					return { items: newItems, cartCount };
				});
			},

			removeItem: (id: string, color?: string, size?: string) => {
				set((state) => ({
					items: state.items.filter(
						(item) =>
							!(
								item.id === id &&
								(color ? item.color === color : true) &&
								(size ? item.size === size : true)
							)
					),
				}));
			},

			updateQuantity: (
				id: string,
				quantity: number,
				color?: string,
				size?: string
			) => {
				if (quantity < 1) return;
				set((state) => ({
					items: state.items.map((item) =>
						item.id === id &&
						(color ? item.color === color : true) &&
						(size ? item.size === size : true)
							? { ...item, quantity }
							: item
					),
				}));
			},

			clearCart: () => {
				set({ items: [] });
			},

			get total() {
				return get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				);
			},

			get cartCount() {
				return get().items.reduce((sum, item) => sum + item.quantity, 0);
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() =>
				typeof window !== "undefined" ? localStorage : undefined!
			),
			partialize: (state) => ({ items: state.items }),
			skipHydration: true,
		}
	)
);
