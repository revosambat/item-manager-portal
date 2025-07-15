import type { RouteObject } from "react-router-dom"
import ItemListPage from "../pages/items/ItemListPage"
import ItemDetailPage from "../pages/items/ItemDetailPage"
import ItemCreatePage from "../pages/items/ItemCreatePage"
import ItemEditPage from "../pages/items/ItemEditPage"
import ItemsLayout from "../layout/ItemsLayout"

export const itemRoutes: RouteObject[] = [
	{
		path: "/items",
		element: <ItemsLayout />,
		children: [
			{ index: true, element: <ItemListPage /> },
			{ path: "/items/new", element: <ItemCreatePage /> },
			{ path: "/items/:id", element: <ItemDetailPage /> },
			{ path: "/items/:id/edit", element: <ItemEditPage /> },
		],
	},
]
