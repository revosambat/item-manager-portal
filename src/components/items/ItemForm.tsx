import { useEffect } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { itemFormSchema, type ItemFormType } from "../../schemas/itemFormSchema"
import TextInput from "../ui/Input"
import TextArea from "../ui/TextArea"
import Button from "../ui/Button"
import { Save } from "lucide-react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useItemContext } from "../../context/ItemContext"
import { useNavigate } from "react-router-dom"
import FileUploadInput from "../ui/FIleUploader"

interface Props {
	itemId?: number
}
const ItemForm = ({ itemId }: Props) => {
	const navigate = useNavigate()
	const { items, updateItem, createItem } = useItemContext()
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ItemFormType>({
		defaultValues: {
			name: "",
			category: "",
			price: 0,
			description: "",
			imageUrl: "", // ensure this is always present, even if empty
			stock: 0,
		},
		resolver: yupResolver(itemFormSchema),
	})

	const handleFormSubmit: SubmitHandler<ItemFormType> = (values) => {
		if (itemId) {
			updateItem(itemId, values)
			navigate("/items")
		} else {
			createItem(values)
			navigate("/items")
		}
	}

	useEffect(() => {
		if (itemId) {
			const defaultItem = items.filter((item) => item?.id === itemId)
			setValue("name", defaultItem[0]?.name)
			setValue("category", defaultItem[0]?.category)
			setValue("price", defaultItem[0]?.price)
			setValue("description", defaultItem[0]?.description)
			setValue("imageUrl", defaultItem[0]?.imageUrl ?? "")
			setValue("stock", defaultItem[0].stock ?? 0)
		}
	}, [itemId])
	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="border-2 border-blue-300 p-5 rounded-2xl"
		>
			<div className="text-left text-3xl text-yellow-600 mb-5">
				<h3>{!itemId ? "Create Item" : `Edit Item`}</h3>
			</div>
			<div className="grid sm:grid:cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mb-5">
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Name"
							labelClassName="text-pink-600"
							onChange={onChange}
							value={value}
							type="text"
							error={errors.name?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="category"
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Category"
							labelClassName="text-pink-600"
							onChange={onChange}
							value={value}
							type="text"
							error={errors.category?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="price"
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Price"
							labelClassName="text-pink-600"
							onChange={onChange}
							value={value}
							type="number"
							error={errors.price?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, value } }) => (
						<TextArea
							className="h-40"
							label="Description"
							labelClassName="text-pink-600"
							onChange={onChange}
							value={value}
							cols={5}
							rows={10}
							error={errors.description?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="stock"
					render={({ field: { onChange, value } }) => (
						<TextInput
							label="Stock"
							labelClassName="text-pink-600"
							onChange={onChange}
							value={value}
							type="number"
							error={errors.stock?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="imageUrl"
					render={({ field: { onChange, value } }) => (
						<FileUploadInput
							label="Upload Image"
							error={errors.imageUrl?.message}
							imageUrl={value}
							onChange={(e) => {
								const file = e.target.files?.[0]
								if (file) {
									const reader = new FileReader()
									reader.onloadend = () => {
										onChange(reader.result?.toString() || "")
									}
									reader.readAsDataURL(file)
								}
							}}
						/>
					)}
				/>
			</div>
			<Button
				className="text-white w-1/4 py-3 rounded-md bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 ml-auto justify-center cursor-pointer"
				title="Save"
				icon={<Save />}
				type="submit"
			/>
		</form>
	)
}

export default ItemForm
