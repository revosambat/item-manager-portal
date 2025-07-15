import { BrowserRouter, Routes, Route } from "react-router-dom"
import { itemRoutes } from "./routes/itemsRoutes"
import "./App.css"
import OnBoardingPage from "./pages/OnBoardingPage"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{itemRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element}>
						{route.children?.map((child, i) => (
							<Route
								key={i}
								path={child.path}
								element={child.element}
								index={child.index}
							/>
						))}
					</Route>
				))}
				<Route path="/" element={<OnBoardingPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
