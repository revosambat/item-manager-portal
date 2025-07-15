import React from "react"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	labelClassName?: React.HTMLAttributes<HTMLLabelElement>["className"]
}

const Input = ({ label, error, id, labelClassName, className, ...props }: TextInputProps) => {
	const inputId =
		id || props.name || `input-${Math.random().toString(36).substring(2, 9)}`

	return (
		<div className="w-full space-y-1">
			{label && (
				<label
					htmlFor={inputId}
					className={`block text-left text-md font-medium text-gray-700 ${labelClassName || ""}`}
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
					error ? "border-red-500" : "border-gray-300"
				} ${className ?? ""}`}
				{...props}
			/>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	)
}

export default Input
