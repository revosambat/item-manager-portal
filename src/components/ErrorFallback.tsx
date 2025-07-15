import { type FallbackProps } from "react-error-boundary"
import Button from "./ui/Button"

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div className="p-6 border border-red-300 bg-red-100 text-red-700 rounded-md">
			<h2 className="text-lg font-bold mb-2">Something went wrong!</h2>
			<p className="mb-4">{error.message}</p>
			<Button
				onClick={resetErrorBoundary}
				className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				title={"Try Again"}
			/>
		</div>
	)
}

export default ErrorFallback
