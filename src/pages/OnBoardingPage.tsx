import Button from "../components/ui/Button"
import { Link } from "react-router-dom"
import InitialImage from "../assets/item-manager-initial.png"

const OnBoardingPage = () => {
	return (
		<div className="h-screen flex gap-4 flex-col md:flex-col lg:flex-row">
			<div className="flex-1 flex flex-col items-center justify-center">
				<img
					src={InitialImage}
					alt="Item Manager Main Image"
					className="w-full max-w-md h-auto object-contain"
				/>
			</div>
			<div className="flex flex-col gap-y-10 items-center justify-center flex-1">
				<div className="text-center px-4">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-blue-900">
						Welcome
					</h1>
					<p className="text-xl sm:text-2xl md:text-4xl lg-text-5xl font-medium text-blue-950">
						to
					</p>
					<h2 className="text-xl font-mono sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mt-2">
						Item Manager
					</h2>
				</div>
				<Link to="/items" hrefLang="">
					<Button
						className="bg-gradient-to-bl from-blue-700 via-blue-500 to-blue-900 w-[300px] text-white px-4 py-2 rounded-md justify-center"
						title="Get Started"
					/>
				</Link>
			</div>
		</div>
	)
}

export default OnBoardingPage
