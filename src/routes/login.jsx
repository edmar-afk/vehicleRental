/* eslint-disable react/no-unescaped-entities */ import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import logo from "../assets/img/logo.png";
import { motion } from "framer-motion";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Swal from "sweetalert2";
import api from "../assets/api"; // Make sure to setup your Axios instance

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const swalInstance = Swal.fire({
			title: "Logging In...",
			text: "Checking for right credentials.",
			icon: "info",
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		try {
			const res = await api.post("/api/token/", { email, password });

			if (res.status === 200) {
				localStorage.setItem("ACCESS_TOKEN", res.data.access);
				localStorage.setItem("REFRESH_TOKEN", res.data.refresh);

				// Fetch user details
				const userRes = await api.get("/api/user/", {
					headers: {
						Authorization: `Bearer ${res.data.access}`,
					},
				});

				localStorage.setItem("userData", JSON.stringify(userRes.data));

				swalInstance.close();
				Swal.fire({
					title: "Success!",
					text: "You have logged in successfully.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/home");
				});
			} else {
				swalInstance.close();
				Swal.fire({
					title: "Error!",
					text: "Login failed.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			swalInstance.close();
			Swal.fire({
				title: "Error!",
				text: error.response?.data?.detail || "Login failed",
				icon: "error",
				confirmButtonText: "OK",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen bg-white">
			<Link
				to="/"
				className="p-3 flex items-center fixed">
				<ArrowBackIosOutlinedIcon className="text-gray-800" />
				<p className="text-gray-800 text-sm -mt-1 font-bold">Back</p>
			</Link>
			<div className="flex flex-col items-center justify-center pt-12 mb-2">
				<motion.img
					initial={{ scale: 0 }}
					animate={{ rotate: 360, scale: 1 }}
					transition={{ type: "spring", stiffness: 160, damping: 30 }}
					src={logo}
					className="w-40"
					alt=""
				/>
				<motion.p
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 160, damping: 30 }}
					className="text-gray-800 font-bold text-4xl">
					Sign In
				</motion.p>
			</div>
			<Grid
				container
				component="main"
				className="flex items-center justify-center">
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={0}
					square
					className="flex flex-col items-center justify-center p-8 bg-transparent">
					<form
						className="w-full mt-1 bg-transparent"
						onSubmit={handleSubmit}
						noValidate>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: "spring", stiffness: 160, damping: 30 }}>
							<TextField
								onChange={(e) => setEmail(e.target.value)}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								className="mb-4 bg-transparent"
								name="email"
								label="Your Email"
								type="email"
								id="email"
								autoComplete="off"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.1 }}>
							<TextField
								onChange={(e) => setPassword(e.target.value)}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								className="mb-4 bg-transparent"
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</motion.div>
						<br />
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.2 }}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className="mt-8 mb-2"
								disabled={loading}>
								{loading ? "Signing In..." : "Sign In"}
							</Button>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.4 }}>
							<Grid
								container
								className="mt-2">
								Don't Have an account?
								<Grid item>
									<Link
										to="/register"
										variant="body2"
										className="ml-0.5 text-blue-400 font-bold">
										Sign Up
									</Link>
								</Grid>
							</Grid>
						</motion.div>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
