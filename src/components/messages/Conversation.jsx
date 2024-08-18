/* eslint-disable react/no-unescaped-entities */ import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../assets/api";
import userIcon from "../../assets/img/user-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
function Conversation() {
	const { receiverId } = useParams();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await api.get(`/api/receiver/${receiverId}/`);
				setProfile(response.data);
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		fetchProfile();
	}, [receiverId]);

	if (!profile) {
		return <div>Loading...</div>; // Add a loading state or placeholder
	}
	return (
		<>
			<div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
				<div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
					<div className="relative flex items-center space-x-4 ml-4">
						<div className="relative">
							<img
								src={profile.profile_pic ? profile.profile_pic : userIcon}
								alt="Profile"
								className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
							/>
						</div>
						<div className="flex flex-col leading-tight">
							<div className="text-2xl mt-1 flex items-center">
								<span className="text-gray-700 mr-3"></span>
							</div>
							<span className="text-lg text-gray-800">
								{profile.user.first_name} {profile.user.last_name}
							</span>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<Link
							to={"/messages"}
							type="button"
							className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-red-500 hover:bg-red-200 focus:outline-none">
							<FontAwesomeIcon
								icon={faBackspace}
								className="text-2xl"
							/>
						</Link>
					</div>
				</div>
				<div
					id="messages"
					className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blueLighter scrollbar-w-2 scrolling-touch">
					<div className="chat-message">
						<div className="flex items-end justify-end">
							<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
								<div>
									<span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
										Hi
									</span>
								</div>
							</div>
							<img
								src={userIcon}
								alt="My profile"
								className="w-6 h-6 rounded-full order-2"
							/>
						</div>
					</div>
					<div className="chat-message">
						<div className="flex items-end">
							<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
								<div>
									<span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-200 text-gray-800">
										Hello
									</span>
								</div>
							</div>
							<img
								src={profile.profile_pic ? profile.profile_pic : userIcon}
								alt="My profile"
								className="w-6 h-6 rounded-full order-1"
							/>
						</div>
					</div>
				</div>
				<div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
					<div className="relative flex">
						<input
							type="text"
							placeholder={`Write a message to ${profile.user.first_name}`}
							className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-800 placeholder-gray-600 pl-2 pr-[90px] bg-gray-200 rounded-md py-3"
						/>
						<div className="absolute right-0 items-center inset-y-0 flex bg-gray-200">
							<button
								type="button"
								className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-blue-200 focus:outline-none">
								<FontAwesomeIcon
									icon={faImage}
									className="text-xl"
								/>
							</button>
							<button
								type="button"
								className="inline-flex items-center justify-center rounded-lg px-2 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
								<FontAwesomeIcon
									icon={faPaperPlane}
									className="mr-1"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Conversation;
