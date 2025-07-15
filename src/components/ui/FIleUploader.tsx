import React from "react"

interface FileUploadInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	imageUrl?: string
	labelClassName?: React.HTMLAttributes<HTMLLabelElement>["className"]
}

const FileUploadInput = ({
	label,
	error,
	id,
	labelClassName,
	imageUrl,
	className,
	...props
}: FileUploadInputProps) => {
	const inputId =
		id ||
		props.name ||
		`file-input-${Math.random().toString(36).substring(2, 9)}`

	return (
		<div className="w-full space-y-2">
			{label && (
				<label
					htmlFor={inputId}
					className={`block text-left text-md font-medium text-gray-700 ${
						labelClassName || ""
					}`}
				>
					{label}
				</label>
			)}

			{imageUrl && (
				<div className="mt-2">
					<img
						src={imageUrl}
						alt="Preview"
						className="w-32 h-32 object-cover rounded-md border"
					/>
				</div>
			)}

			<input
				id={inputId}
				type="file"
				accept="image/*"
				className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm cursor-pointer file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
					error ? "border-red-500" : "border-gray-300"
				} ${className ?? ""}`}
				{...props}
			/>

			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	)
}

export default FileUploadInput
