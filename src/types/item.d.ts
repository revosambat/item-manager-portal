export interface Item {
	id: number
	name: string
	category: string
	price: number
	description: string
	imageUrl: string
	stock: number
	createdAt: string
	updatedAt: string
}

/** Array of items */
export type Items = Item[]
