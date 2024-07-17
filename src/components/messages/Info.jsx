import { motion } from "framer-motion";
import MessageIcon from "../../assets/svg/MessageIcon";
export default function Info() {
	return (
		<>
			<div>
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 1, // Fade-in duration
						ease: "easeOut",
						type: "spring",
						stiffness: 200, // Controls the bounce effect
						damping: 10, // Controls the bounce effect
					}}
					className="mx-auto flex justify-center mt-24">
					<MessageIcon />
				</motion.div>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 1, // Fade-in duration
						ease: "easeOut",
						type: "spring",
						stiffness: 200, // Controls the bounce effect
						damping: 10, // Controls the bounce effect
					}}
					className="text-center text-gray-700">
					No Messages here...
				</motion.p>
				<motion.p
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 1, // Fade-in duration
						ease: "easeOut",
						type: "spring",
						stiffness: 200, // Controls the bounce effect
						damping: 10, // Controls the bounce effect
					}}
					className="text-center text-gray-700">
					Interact with dealers now.
				</motion.p>
			</div>
		</>
	);
}
