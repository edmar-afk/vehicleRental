import { faHouse, faMessage, faNoteSticky, faUserCircle } from "@fortawesome/free-solid-svg-icons";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { NavLink } from "react-router-dom";
function Navbar() {
	return (
		<div>
			<div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 shadow-2xl">
				<div className="grid h-full max-w-lg grid-cols-5 mx-auto overflow-hidden">
					<NavLink
						to="/home"
						className={({ isActive }) =>
							`inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 ${
								isActive ? "bg-gray-200 scale-125 duration-300" : "scale-100 duration-300"
							}`
						}>
						{({ isActive }) => (
							<>
								<FontAwesomeIcon
									icon={faHouse}
									className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
								/>
								<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Home</span>
							</>
						)}
					</NavLink>

					<NavLink
						to="/messages"
						className={({ isActive }) =>
							`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ${
								isActive ? "bg-gray-200 scale-125 duration-300" : "scale-100 duration-300"
							}`
						}>
						{({ isActive }) => (
							<>
								<FontAwesomeIcon
									icon={faMessage}
									className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
								/>
								<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Messages</span>
							</>
						)}
					</NavLink>

					<div className="flex items-center justify-center">
						<NavLink
							to="/postRent"
							className={({ isActive }) =>
								`inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none transform transition-transform duration-300 ${
									isActive ? "scale-125" : "scale-100"
								}`
							}>
							<svg
								className="w-4 h-4 text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 18 18">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 1v16M1 9h16"
								/>
							</svg>
						</NavLink>
					</div>

					<NavLink
						to="/rental"
						className={({ isActive }) =>
							`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ${
								isActive ? "bg-gray-200 scale-125 duration-300" : "scale-100 duration-300"
							}`
						}>
						{({ isActive }) => (
							<>
								<FontAwesomeIcon
									icon={faNoteSticky}
									className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
								/>
								<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Rental</span>
							</>
						)}
					</NavLink>

					<NavLink
						to="/profile"
						className={({ isActive }) =>
							`inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 ${
								isActive ? "bg-gray-200 scale-125 duration-300" : "scale-100 duration-300"
							}`
						}>
						{({ isActive }) => (
							<>
								<FontAwesomeIcon
									icon={faUserCircle}
									className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
								/>
								<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Profile</span>
							</>
						)}
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
