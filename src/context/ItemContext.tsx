import { createContext, useContext, useEffect, useState } from "react"
import type { Item } from "../types/item"
import initialProducts from "../data/products.json"

interface ItemContextType {
	items: Item[]
	createItem: (item: Omit<Item, "id" | "createdAt" | "updatedAt">) => void
	updateItem: (id: number, updates: Partial<Item>) => void
	deleteItem: (id: number) => void
}

export const ItemContext = createContext<ItemContextType | undefined>(undefined)

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
	const [items, setItems] = useState<Item[]>([])

	useEffect(() => {
		setItems(initialProducts) // only once, no persistence
	}, [])

	const createItem = (item: Omit<Item, "id" | "createdAt" | "updatedAt">) => {
		const maxId = items.length > 0 ? Math.max(...items.map((i) => i.id)) : 0
		const now = new Date().toISOString()

		const newItem: Item = {
			...item,
			id: maxId + 1,
			createdAt: now,
			updatedAt: now,
		}

		setItems((prev) => [...prev, newItem])
	}

	const updateItem = (id: number, updates: Partial<Item>) => {
		const now = new Date().toISOString()

		setItems((prev) =>
			prev.map((item) =>
				item.id === id
					? {
							...item,
							...updates,
							updatedAt: now,
					  }
					: item
			)
		)
	}

	const deleteItem = (id: number) => {
		setItems((prev) => prev.filter((item) => item.id !== id))
	}

	return (
		<ItemContext.Provider value={{ items, createItem, updateItem, deleteItem }}>
			{children}
		</ItemContext.Provider>
	)
}

export const useItemContext = () => {
	const ctx = useContext(ItemContext)
	if (!ctx) throw new Error("useItemContext must be used inside <ItemProvider>")
	return ctx
}
