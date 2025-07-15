
import Card from "../ui/Card"
import Button from "../ui/Button"
import { Pencil, Trash } from "lucide-react"
import type { Item } from "../../types/item"


interface Props<T> {
	item: T
	onEdit?: (item: T) => void
	onDelete?: (item: T) => void
}

const ItemsCard = ({ item, onEdit, onDelete }: Props<Item>) => {
	return (
		<Card className="space-y-4">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-xl font-semibold">{item.name}</h2>
					<p className="text-sm text-gray-500">{item.category}</p>
				</div>
				<div className="text-right">
					<p className="text-sm font-medium text-green-600">${item.price.toFixed(2)}</p>
					<p className="text-xs text-gray-400">Stock: {item.stock}</p>
				</div>
			</div>

			{item.imageUrl && (
				<img
					src={item.imageUrl}
					alt={item.name}
					className="w-full h-48 object-cover rounded-md"
				/>
			)}

			<p className="text-sm text-gray-700">{item.description}</p>

			<div className="flex justify-end gap-2">
				<Button
					onClick={() => onEdit?.(item)}
					className="bg-blue-600 hover:bg-blue-700 text-white justify-center items-center p-1 rounded-md"
					icon={<Pencil className="h-4 w-4" />}
					title="Edit"
				/>
				<Button
					onClick={() => onDelete?.(item)}
					className="bg-red-600 hover:bg-red-700 text-white justify-center items-center p-1 rounded-md"
					icon={<Trash className="h-4 w-4" />}
					title="Delete"
				/>
			</div>
		</Card>
	)
}

export default ItemsCard
