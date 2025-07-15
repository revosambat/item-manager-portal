import Button from "../../components/ui/Button"
import { ArrowLeft } from "lucide-react"
import Card from "../../components/ui/Card"
import { useNavigate, useParams } from "react-router-dom"
import { useItemContext } from "../../context/ItemContext"

const ItemDetailPage = () => {
	const navigate = useNavigate()
	const params = useParams()
	if (!params?.id) {
		return (
			<div>
				<h1 className="text-red-600"> No id found for detail.</h1>
			</div>
		)
	}
	const { items } = useItemContext()
	const detailItem = items.filter((item) => item.id === +params.id!)[0]
	return (
		<div className="max-w-4xl mx-auto py-10 px-4">
			<Button
				title="Back"
				icon={<ArrowLeft />}
				onClick={() => navigate(-1)}
				className="mb-6"
			/>

			<Card>
				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1">
						<img
							src={detailItem.imageUrl}
							alt={detailItem.name}
							className="w-full h-auto max-h-80 object-contain rounded-md"
						/>
					</div>
					<div className="flex-1 space-y-3">
						<h2 className="text-3xl font-bold text-blue-950">
							{detailItem.name}
						</h2>
						<p className="text-sm text-gray-500">{detailItem.category}</p>
						<p className="text-xl text-green-700 font-semibold">
							${detailItem.price}
						</p>
						<p className="text-gray-700">{detailItem.description}</p>
						<div className="text-sm text-gray-500">
							<p>Stock: {detailItem.stock}</p>
							<p>
								Created: {new Date(detailItem.createdAt).toLocaleDateString()}
							</p>
							<p>
								Updated: {new Date(detailItem.updatedAt).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default ItemDetailPage
