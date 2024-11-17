/* eslint-disable react/no-unescaped-entities */ import WavingHandIcon from "@mui/icons-material/WavingHand";import logo from "../../assets/img/logo.jpg";import { motion } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
function ChatHeader() {
	return (
		<>
			<header>
				<Link
					to={"/chatbot"}
					className="flex justify-between items-center mb-3">
					<div className="flex items-center">
						<p className="inline-flex items-start mr-3">
							<img
								className="rounded-full"
								src={logo}
								width="48"
								height="48"
								alt="Lauren Marsano"
							/>
						</p>
						<div className="pr-1">
							<p className="inline-flex text-gray-800 hover:text-gray-900">
								<span className="text-xl leading-snug font-bold">Financial Chatbot</span>
							</p>
							<p className="block text-sm font-medium hover:text-indigo-500">I'm here to help you</p>
						</div>
					</div>

					<div className="relative inline-flex flex-shrink-0">
						<motion.div
							animate={{ rotate: [0, 25, 0] }}
							transition={{
								repeat: Infinity,
								repeatType: "loop",
								duration: 1,
								ease: "easeInOut",
							}}>
							<WavingHandIcon className="text-purple-600" />
						</motion.div>
					</div>
				</Link>

				<div className="flex flex-wrap justify-start">
					<div className="flex items-center">
						<InfoOutlinedIcon fontSize="small" />
						<p className="text-xs font-medium whitespace-nowrap text-indigo-500 underline ml-1">
							Chatbot can make mistakes, please bear with it.
						</p>
					</div>
				</div>
			
			</header>
		</>
	);
}

export default ChatHeader;
