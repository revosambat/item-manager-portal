import ItemsData from "../../data/products.json"
import type { Column } from "../../components/ui/DataTable"
import type { Item } from "../../types/item"
import DataTable from "../../components/ui/DataTable"

const ItemListPage = () => {
	const columns: Column<Item>[] = [
		{
			key: "id",
			header: "ID",
			width: "w-16",
			align: "center",
		},
		{
			key: "name",
			header: "Name",
			width: "w-16",
			align: "center",
		},
        {
            key: "description",
            header: "Description",
            width: "w-16",
            align: "center"
        }
	]

	const handleRowClick = (item: Item) => {
		console.log("Row clicked:", item)
	}
	return <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Advanced Data Table</h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive table component with TypeScript support, sorting, searching, and pagination.
        </p>
      </div>

      <DataTable
        data={ItemsData}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        onRowClick={handleRowClick}
        className="bg-background"
      />
    </div>
}

export default ItemListPage
