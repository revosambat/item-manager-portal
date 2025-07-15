import { useMemo, useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./Table"
import Button from "./Button"
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"

export interface Column<T> {
	key: keyof T
	header: string
	sortable?: boolean
	render?: (value: any, row: T) => React.ReactNode
	width?: string
	align?: "left" | "center" | "right"
}

export interface DataTableProps<T> {
	data: T[]
	columns: Column<T>[]
	pageSize?: number
	pageSizeOptions?: number[]
	loading?: boolean
	emptyMessage?: string
	className?: string
	onRowClick?: (row: T) => void
}

export interface PaginationInfo {
	currentPage: number
	totalPages: number
	totalItems: number
	itemsPerPage: number
	startItem: number
	endItem: number
}
const DataTable = <T extends Record<string, any>>({
	data,
	columns,
	pageSize = 10,
	pageSizeOptions = [5, 10, 20, 50],
	loading,
	emptyMessage = "No Data Available",
	className = "",
	onRowClick,
}: DataTableProps<T>) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState(pageSize)

	// Paginate data
	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		return data.slice(startIndex, startIndex + itemsPerPage)
	}, [data, currentPage, itemsPerPage])

	// Pagination info
	const paginationInfo: PaginationInfo = useMemo(() => {
		const totalItems = data.length
		const totalPages = Math.ceil(totalItems / itemsPerPage)
		const startItem =
			totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
		const endItem = Math.min(currentPage * itemsPerPage, totalItems)

		return {
			currentPage,
			totalPages,
			totalItems,
			itemsPerPage,
			startItem,
			endItem,
		}
	}, [data.length, currentPage, itemsPerPage])

	// Handle page changes
	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, paginationInfo.totalPages)))
	}

	// Handle page size change
	const handlePageSizeChange = (newPageSize: string) => {
		setItemsPerPage(Number(newPageSize))
		setCurrentPage(1)
	}

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead
									key={String(column.key)}
									className={`${column.width || ""} ${
										column.align === "center"
											? "text-center"
											: column.align === "right"
											? "text-right"
											: "text-left"
									}`}
								>
									<div className="flex items-center gap-2">{column.header}</div>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
										<span className="ml-2">Loading...</span>
									</div>
								</TableCell>
							</TableRow>
						) : paginatedData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-muted-foreground"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((row, index) => (
								<TableRow
									key={index}
									className={
										onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
									}
									onClick={() => onRowClick?.(row)}
								>
									{columns.map((column) => (
										<TableCell
											key={String(column.key)}
											className={
												column.align === "center"
													? "text-center"
													: column.align === "right"
													? "text-right"
													: "text-left"
											}
										>
											{column.render
												? column.render(row[column.key], row)
												: row[column.key]?.toString() || "-"}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{paginationInfo.totalPages > 1 && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Showing {paginationInfo.startItem} to {paginationInfo.endItem} of{" "}
						{paginationInfo.totalItems} results
					</div>
					<div className="flex items-center gap-2">
						<Button
							icon={<ChevronsLeft className="h-4 w-4" />}
							onClick={() => goToPage(1)}
							disabled={currentPage === 1}
						/>

						<Button
							icon={<ChevronLeft className="h-4 w-4" />}
							onClick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
						/>

						<div className="flex items-center gap-1">
							<span className="text-sm">Page</span>
							<span className="text-sm font-medium">
								{currentPage} of {paginationInfo.totalPages}
							</span>
						</div>
						<Button
							icon={<ChevronRight className="h-4 w-4" />}
							onClick={() => goToPage(currentPage + 1)}
							disabled={currentPage === paginationInfo.totalPages}
						/>
						<Button
							icon={<ChevronsRight className="h-4 w-4" />}
							onClick={() => goToPage(paginationInfo.totalPages)}
							disabled={currentPage === paginationInfo.totalPages}
						></Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default DataTable
