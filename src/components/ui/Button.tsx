import React from "react"

interface Props {
	title?: string
	onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"]
	className?: React.HTMLAttributes<HTMLButtonElement>["className"]
	disabled?: boolean
	icon?: React.ReactNode
}
const Button = ({ title, onClick, className, disabled, icon }: Props) => {
	return (
		<button disabled={disabled} onClick={onClick} className={className}>
			{icon ? icon : ""}
			{title ? title : ""}
		</button>
	)
}

export default Button
