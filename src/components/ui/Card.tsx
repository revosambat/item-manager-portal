import React from "react"
import { cn } from "../../utils/cn"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}
const Card = ({ children, className, ...props }: Props) => {
	return (
		<div
			className={cn(
				"rounded-lg border bg-white p-6 shadow-sm md:p-8",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export default Card
