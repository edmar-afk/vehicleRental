import Button from "@mui/material/Button";import { motion } from "framer-motion";

function Info() {
	const variants = {
		hidden: { scale: 0 },
		visible: (i) => ({
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
				delay: i * 1,
			},
		}),
	};

	return (
		<>
			<div className="text-center mt-24 text-gray-700">
				<motion.p
					className="text-xl py-5"
					variants={variants}
					initial="hidden"
					animate="visible"
					custom={0}>
					Are you a dealer?
				</motion.p>
				<motion.p
					className="text-xl py-5"
					variants={variants}
					initial="hidden"
					animate="visible"
					custom={1}>
					Are you looking for clients?
				</motion.p>
				<motion.p
					className="text-xl py-5"
					variants={variants}
					initial="hidden"
					animate="visible"
					custom={2}>
					Post your rent deal here!
				</motion.p>
				<motion.div
					variants={variants}
					initial="hidden"
					animate="visible"
					custom={3}>
					<Button
						variant="outlined"
						className="mt-4">
						Get Started
					</Button>
				</motion.div>
			</div>
		</>
	);
}

export default Info;
