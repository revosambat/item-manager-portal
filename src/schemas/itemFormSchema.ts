import * as Yup from "yup"

const itemFormSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(6, "Must be 6 characters long")
		.required("Name is required"),
	category: Yup.string()
		.trim()
		.min(6, "Must be 6 characters long")
		.required("Category is required"),
	price: Yup.number()
		.moreThan(0, "Must be greater than 0")
		.required("Price is required"),
	description: Yup.string()
		.trim()
		.min(4, "Must be greater than 4 characters")
		.max(1000, "Must be less than 1000 characters")
		.required("Description is required"),
	imageUrl: Yup.string().default(""),
	stock: Yup.number().required("Stock is required"),
})

type ItemFormType = Yup.InferType<typeof itemFormSchema>

export { itemFormSchema }
export type { ItemFormType }
