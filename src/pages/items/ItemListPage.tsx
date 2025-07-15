import type { Column } from "../../components/ui/DataTable"
import type { Item } from "../../types/item"
import DataTable from "../../components/ui/DataTable"
import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import { Edit2, Trash2 } from "lucide-react"
import { useItemContext } from "../../context/ItemContext"

const ItemListPage = () => {
	const navigate = useNavigate()
    const {items, deleteItem} = useItemContext()
	const columns: Column<Item>[] = [
		{
			key: "name",
			header: "Name",
			width: "w-1/2",
			align: "center",
		},
		{
			key: "category",
			header: "Category",
			width: "w-1/2",
			align: "center",
			render: (value) => (
				<div className="py-2 rounded-4xl bg-gradient-to-b from-blue-300 to-blue-600">
					<p className="text-bold text-white">{value}</p>
				</div>
			),
		},
		{
			key: "price",
			header: "Price",
			width: "w-1/2",
			align: "center",
			render: (value) => <p className="">{`$${value}`}</p>,
		},
		{
			key: "actions" as keyof Item,
			header: "Actions",
			align: "center",
			width: "w-1/5",
			render: (_value, row) => (
				<div className="flex justify-center gap-2">
					<Button
						className="bg-gray-400 text-white p-2 rounded-full shadow-md"
						icon={
							<Edit2
								className="w-5 h-5"
								onClick={(e) => {
									e.stopPropagation()
									handleEdit(row)
								}}
							/>
						}
					/>
					<Button
						className="bg-red-700 text-white p-2 rounded-full shadow-md"
						icon={
							<Trash2
								className="w-5 h-5"
								onClick={(e) => {
									e.stopPropagation()
									handleDelete(row)
								}}
							/>
						}
					/>
				</div>
			),
		},
	]

	const handleRowClick = (item: Item) => {
		navigate(`/items/${item.id}`)
	}

	const handleDelete = (item: Item) => {
		const confirm = window.confirm("Are you sure to delete this item?")
		if (confirm) {
			deleteItem(item.id)
		}
	}

	const handleEdit = (item: Item) => {
		navigate(`/items/${item.id}/edit`)
	}
	return (
		<div className="container mx-auto py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-blue-800"> Items Table</h1>
				<p className="text-muted-foreground mt-2 text-yellow-500">
					A comprehensive table component with TypeScript support and
					pagination.
				</p>
			</div>

			<DataTable
				data={items}
				columns={columns}
				onRowClick={handleRowClick}
				className="bg-gray-100"
				loading={false}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</div>
	)
}

export default ItemListPage
