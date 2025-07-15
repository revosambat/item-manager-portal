import type { RouteObject } from "react-router-dom"
import ItemListPage from "../pages/items/ItemListPage"
import ItemDetailPage from "../pages/items/ItemDetailPage"
import ItemCreatePage from "../pages/items/ItemCreatePage"
import ItemEditPage from "../pages/items/ItemEditPage"
import ItemsLayout from "../layout/ItemsLayout"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../components/ErrorFallback"

export const itemRoutes: RouteObject[] = [
	{
		path: "/items",
		element: <ItemsLayout />,
		children: [
			{ index: true, element: <ItemListPage /> },
			{ path: "/items/new", element: <ItemCreatePage /> },
			{
				path: "/items/:id",
				element: (
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<ItemDetailPage />
					</ErrorBoundary>
				),
			},
			{
				path: "/items/:id/edit",
				element: (
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<ItemEditPage />
					</ErrorBoundary>
				),
			},
		],
	},
]
