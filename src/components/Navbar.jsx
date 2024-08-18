import { faCarSide, faHeart, faHouse, faMessage, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
function Navbar() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const isSuperuser = userData?.is_superuser;

	return (
		<div className="relative z-50">
			<div className="fixed w-full z-50 h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 shadow-2xl">
				<div className="grid h-full max-w-lg grid-cols-5 mx-auto overflow-hidden">
					<NavLink
						to="/"
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
						<img
							src={logo}
							alt="Logo"
							className="w-12 h-12 mx-auto border-2 rounded-full border-blue-400 p-1 animate-pulse"
						/>
					</div>

					{isSuperuser ? (
						<NavLink
							to="/postRent"
							className={({ isActive }) =>
								`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ${
									isActive ? "bg-gray-200 scale-125 duration-300" : "scale-100 duration-300"
								}`
							}>
							{({ isActive }) => (
								<>
									<FontAwesomeIcon
										icon={faCarSide}
										className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
									/>
									<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Post Rent</span>
								</>
							)}
						</NavLink>
					) : (
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
										icon={faHeart}
										className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
									/>
									<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Favorites</span>
								</>
							)}
						</NavLink>
					)}

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

			<div className="fixed bottom-0 w-full bg-white h-14"></div>
		</div>
	);
}

export default Navbar;
