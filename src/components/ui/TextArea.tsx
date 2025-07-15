interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	labelClassName?: React.HTMLAttributes<HTMLLabelElement>["className"]
}

const TextArea = ({
	label,
	error,
	id,
	labelClassName,
	className,
	...props
}: TextAreaProps) => {
	const textAreaId =
		id ||
		props.name ||
		`text-area-${Math.random().toString(36).substring(2, 9)}`

	return (
		<div className="w-full space-y-1">
			{label && (
				<label
					htmlFor={textAreaId}
					className={`block text-left text-md font-medium text-gray-700 ${
						labelClassName || ""
					}`}
				>
					{label}
				</label>
			)}
			<textarea
				id={textAreaId}
				className={`w-full h-20 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
					error ? "border-red-500" : "border-gray-300"
				} ${className ?? ""}`}
				{...props}
			/>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	)
}

export default TextArea
