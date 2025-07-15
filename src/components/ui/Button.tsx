import React from "react"
import { cn } from "../../utils/cn"

interface Props {
	title?: string
	onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"]
	className?: React.HTMLAttributes<HTMLButtonElement>["className"]
	disabled?: boolean
	icon?: React.ReactNode
	titleClassName?: React.HTMLAttributes<HTMLSpanElement>["className"]
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}
const Button = ({
	title,
	onClick,
	className,
	disabled,
	icon,
	titleClassName,
	type,
}: Props) => {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={cn("flex gap-2", className)}
		>
			{icon}
			{title && <span className={`${titleClassName}`}>{title}</span>}
		</button>
	)
}

export default Button
