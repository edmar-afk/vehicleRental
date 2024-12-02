import { faCarSide, faHeart, faHouse, faMessage, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import api from "../assets/api";

function Navbar() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const isSuperuser = userData?.is_superuser;
	const [unreadCount, setUnreadCount] = useState(0);
	console.log(unreadCount);
	// Fetch unread message count
	useEffect(() => {
		const fetchUnreadCount = async () => {
			if (!userData?.id) return;

			try {
				const response = await api.get(`/api/messages/unread-global/${userData.id}/`);
				setUnreadCount(response.data.unread_count || 0);
				console.log(response);
			} catch (error) {
				console.error("Failed to fetch unread messages:", error);
			}
		};

		fetchUnreadCount();
	}, [userData]);

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
							<div className="relative flex flex-col">
								<FontAwesomeIcon
									icon={faMessage}
									className={`text-xl ${isActive ? "text-blue-400" : "text-gray-700"}`}
								/>
								<span className={`text-[7px] ${isActive ? "text-blue-400" : "text-gray-700"}`}>Messages</span>
								{/* Conditionally render the unread count */}
								{unreadCount > 0 && (
									<span className="text-[5px] bg-blue-600 font-bold text-white fixed top-1.5 right-4 p-1 rounded-full">
										{unreadCount}
									</span>
								)}
							</div>
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
