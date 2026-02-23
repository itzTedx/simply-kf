import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	size?: string;
	slug?: string;
	/** Max quantity allowed from Payload CMS stock (undefined/null = no limit) */
	stock?: number | null;
}

interface CartStore {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: number, color?: string, size?: string) => void;
	updateQuantity: (
		id: number,
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

					const maxQty =
						typeof newItem.stock === "number" ? newItem.stock : undefined;

					let newItems;

					if (existingItemIndex > -1) {
						newItems = [...state.items];
						const added =
							newItems[existingItemIndex].quantity + newItem.quantity;
						newItems[existingItemIndex].quantity =
							maxQty != null ? Math.min(added, maxQty) : added;
						// Keep stock on item for cart page limits
						if (maxQty != null) {
							newItems[existingItemIndex].stock = maxQty;
						}
					} else {
						const quantity =
							maxQty != null
								? Math.min(newItem.quantity, maxQty)
								: newItem.quantity;
						newItems = [...state.items, { ...newItem, quantity }];
					}

					const cartCount = newItems.reduce(
						(sum, item) => sum + item.quantity,
						0
					);

					return { items: newItems, cartCount };
				});
			},

			removeItem: (id: number, color?: string, size?: string) => {
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
				id: number,
				quantity: number,
				color?: string,
				size?: string
			) => {
				if (quantity < 1) return;
				set((state) => ({
					items: state.items.map((item) => {
						if (
							item.id !== id ||
							(color ? item.color !== color : false) ||
							(size ? item.size !== size : false)
						) {
							return item;
						}
						const capped =
							typeof item.stock === "number"
								? Math.min(quantity, item.stock)
								: quantity;
						return { ...item, quantity: capped };
					}),
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
