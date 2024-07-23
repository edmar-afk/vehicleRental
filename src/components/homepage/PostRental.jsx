import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../../assets/img/user-icon.png";
import { faExclamationTriangle, faHeart, faLocationDot, faUsers } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
function postRental() {
	return (
		<div className="rounded-md shadow-2xl sm:w-96 bg-[#f6f6f6] text-gray-800 mt-8">
			<div className="flex items-center justify-between p-3">
				<div className="flex items-center space-x-2">
					<img
						src={icon}
						alt=""
						className="object-cover object-center w-8 h-8 rounded-ful"
					/>
					<div className="-space-y-1">
						<h2 className="text-sm font-semibold leading-none">Rimark Tumala</h2>
						<span className="inline-block text-xs leading-none text-gray-600">Posted a rent 1m ago</span>
					</div>
				</div>
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 1.5 }}>
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className="text-2xl"
					/>
				</motion.div>
			</div>
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrTLxJ73jn7dAl0S7urT3ef9gecb6j_61RQ&s"
				alt=""
				className="object-cover object-center w-full h-72 bg-gray-500"
			/>
			<div className="p-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-left">
						<FontAwesomeIcon
							icon={faLocationDot}
							className="text-xl"
						/>
						<span className="text-[9px] ml-1 text-gray-600"> Pob. Guipos ZDS</span>
					</div>
					<div className="flex items-center justify-center">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 1.5 }}>
							<FontAwesomeIcon
								icon={faHeart}
								className="text-xl"
							/>
						</motion.button>
						<span className="text-[9px] ml-2 text-gray-600">Add to favorites</span>
					</div>
				</div>

				<div className="flex flex-wrap items-center pt-8 pb-1 -ml-0.5">
					<div className="flex items-center space-x-2">
						<div className="flex">
							<FontAwesomeIcon
								icon={faUsers}
								className="text-sm"
							/>
						</div>
						<span className="text-xs">9999 people liked this post</span>
					</div>
				</div>
				<div className="space-y-3 mt-2 mb-2">
					<p className="text-gray-700 text-xs">Libre rent pang dakop sa mga walay uyab HAAHAHAHAH</p>
				</div>
			</div>
		</div>
	);
}

export default postRental;
