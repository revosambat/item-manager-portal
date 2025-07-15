import { ArrowLeft } from "lucide-react"
import ItemForm from "../../components/items/ItemForm"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"

const ItemCreatePage = () => {
    const navigate = useNavigate()
	return (
		<div>
            <div className="flex justify-start mb-4">
				<Button
					icon={<ArrowLeft />}
					title="Back"
					onClick={() => navigate(-1)}
				/>
			</div>
			<ItemForm />
		</div>
	)
}

export default ItemCreatePage
