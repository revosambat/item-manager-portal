import React from "react"
import { cn } from "../../utils/cn"

const Table = ({
	className,
	...props
}: React.HTMLAttributes<HTMLTableElement>) => (
	<div className="relative w-full overflow-auto">
		<table className={cn("table-fixed w-full", className)} {...props} />
	</div>
)

const TableHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className={cn(className)} {...props} />
)

const TableBody = ({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className={cn(className)} {...props} />
)

const TableRow = ({
	className,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
	<tr className={cn("border-b", className)} {...props} />
)

const TableHead = ({
	className,
	...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
	<th
		className={cn(
			"h-12 px-4 text-left align-middle font-medium text-muted-foreground",
			className
		)}
		{...props}
	/>
)

const TableCell = ({
	className,
	...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
	<td className={cn("p-4 align-middle", className)} {...props} />
)

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
