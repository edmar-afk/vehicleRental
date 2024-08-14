/* eslint-disable react/no-unescaped-entities */ import { motion } from "framer-motion";import WavingHandIcon from "@mui/icons-material/WavingHand";

function Greetings() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	return (
		<div className="p-2">
			<div className="mb-4 flex flex-row items-center rounded-xl bg-gradient-to-l from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-2xl w-full">
				<motion.div
					className="ml-3"
					animate={{
						rotate: [0, 15, -15, 0], // Rotate back and forth
					}}
					transition={{
						duration: 2, // Duration for one shake cycle
						repeat: Infinity, // Repeat infinitely
						repeatType: "loop", // Loop the animation
					}}>
					<WavingHandIcon
						style={{ width: 80, height: 80 }} // Set custom width and height
						className="text-white"
					/>
				</motion.div>
				<div className="p-6">
					<h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal uppercase">
						Greetings, {userData.first_name}
					</h6>

					<p className="block mb-8 font-sans text-xs antialiased font-normal leading-relaxed">
						Let's keep our interactions positive and avoid making prank deals. It’s always best to maintain a friendly
						and respectful chat. 😊
					</p>
				</div>
			</div>
		</div>
	);
}

export default Greetings;
