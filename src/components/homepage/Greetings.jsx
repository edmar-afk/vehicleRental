/* eslint-disable react/no-unescaped-entities */ import { motion } from "framer-motion";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
function Greetings() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const firstName = userData?.first_name || "Visitor";

	return (
		<div className="p-2">
			<div className="mb-4 flex flex-row items-center rounded-xl bg-gradient-to-l from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-2xl w-full">
				<motion.div
					className="ml-3"
					animate={{
						rotate: [0, 15, -15, 0], // Rotate back and forth
						y: [0, -10, 0], // Move up and down to create a bounce effect
					}}
					transition={{
						duration: 1.5, // Duration for one full animation cycle
						repeat: Infinity, // Repeat infinitely
						repeatType: "loop", // Loop the animation
					}}>
					<EmojiPeopleIcon
						style={{ width: 80, height: 80 }} // Set custom width and height
						className="text-white"
					/>
				</motion.div>

				<div className="p-6">
					<h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal uppercase">
						Greetings, {firstName}
					</h6>

					<p className="block mb-8 font-sans text-xs antialiased font-normal leading-relaxed">
						Let's keep our interactions positive and avoid making prank deals.
					</p>
				</div>
			</div>

			<p className="text-xs">
				Welcome to <span className="text-blue-700 font-bold">Car Rental App</span>, where your family vacation begins
				with comfort and convenience. Whether you're embarking on a weekend getaway or an epic road trip, our spacious
				and family-friendly vehicles are ready to make every mile memorable.
			</p>
		</div>
	);
}

export default Greetings;
