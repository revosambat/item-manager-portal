import { Outlet, NavLink, Link } from "react-router-dom"

export default function ItemsLayout() {
	return (
		<div className="max-h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="bg-white shadow px-6 py-4 flex justify-between items-center">
				<Link to={"/"}>
					<h1 className="text-xl font-bold text-blue-800">Item Manager</h1>
				</Link>
				<nav className="space-x-4">
					<NavLink
						to="/items"
						className={({ isActive }) =>
							isActive ? "text-blue-700 font-semibold" : "text-gray-600"
						}
					>
						All Items
					</NavLink>
					<NavLink
						to="/items/create"
						className={({ isActive }) =>
							isActive ? "text-blue-700 font-semibold" : "text-gray-600"
						}
					>
						Create Item
					</NavLink>
				</nav>
			</header>

			{/* Page Content */}
			<main className="flex-1 p-6">
				<Outlet />
			</main>
		</div>
	)
}
