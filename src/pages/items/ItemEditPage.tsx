import { ArrowLeft } from "lucide-react"
import ItemForm from "../../components/items/ItemForm"
import Button from "../../components/ui/Button"
import { useNavigate, useParams } from "react-router-dom"

const ItemEditPage = () => {
	const navigate = useNavigate()
    const param = useParams()
	return (
		<div>
			<div className="flex justify-start mb-4">
				<Button
					icon={<ArrowLeft />}
					title="Back"
					onClick={() => navigate(-1)}
				/>
			</div>
			{param.id !== undefined && <ItemForm itemId={+param.id} />}
		</div>
	)
}

export default ItemEditPage
