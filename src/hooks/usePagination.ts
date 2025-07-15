import { useMemo, useState } from "react"

interface PaginationInfo {
	currentPage: number
	totalPages: number
	totalItems: number
	startItem: number
	endItem: number
}
const usePagination = <T>(pageSize: number, data: T[]) => {
	const [currentPage, setCurrentPage] = useState<number>(1)

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return data.slice(startIndex, startIndex + pageSize)
	}, [data.length, currentPage, pageSize])

	const paginationInfo: PaginationInfo = useMemo(() => {
		const totalItems = data.length
		const totalPages = Math.ceil(totalItems / pageSize)
		const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize * 1
		const endItem = Math.min(currentPage * pageSize, totalItems)

		return {
			currentPage,
			totalItems,
			totalPages,
			startItem,
			endItem,
		}
	}, [data.length, currentPage])

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, paginationInfo.totalPages)))
	}

	return {
		paginatedData,
        paginationInfo,
        goToPage
	}
}

export default usePagination
