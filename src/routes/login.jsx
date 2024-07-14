/* eslint-disable no-unused-vars */ /* eslint-disable react/no-unescaped-entities */ import logo from "../assets/img/logo.png";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../assets/api";
import Swal from "sweetalert2";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../assets/contstants";

const Login = () => {
	const [username, setUsername] = useState("");
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
			const res = await api.post("/api/token/", {
				username: username,
				password: password,
			});

			if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

				// Fetch user details to get all user data
				const userRes = await api.get("/api/user/", {
					headers: {
						Authorization: `Bearer ${res.data.access}`,
					},
				});

				const userData = userRes.data;
				localStorage.setItem("userData", JSON.stringify(userData)); // Store all user data

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
		<>
			<div className="font-[sans-serif]">
				<div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-12 h-[320px]">
					<div>
						<a href="#">
							<img
								src={logo}
								alt="logo"
								className="w-40"
							/>
						</a>
						<div className="max-w-lg mt-12 max-lg:hidden">
							<p className="text-sm mt-4 text-white">Welcome to Car Rentals! Please sign in to access our services</p>
						</div>
					</div>

					<div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
						<form onSubmit={handleSubmit}>
							<div className="mb-8">
								<h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
							</div>

							<div>
								<label className="text-gray-800 text-sm mb-2 block">User name</label>
								<div className="relative flex items-center">
									<input
										name="username"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Enter user name"
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#bbb"
										stroke="#bbb"
										className="w-[18px] h-[18px] absolute right-4"
										viewBox="0 0 24 24">
										<circle
											cx="10"
											cy="7"
											r="6"
											data-original="#000000"></circle>
										<path
											d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
											data-original="#000000"></path>
									</svg>
								</div>
							</div>
							<div className="mt-4">
								<label className="text-gray-800 text-sm mb-2 block">Password</label>
								<div className="relative flex items-center">
									<input
										name="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Enter password"
									/>
									<FontAwesomeIcon
										icon={faKey}
										className="text-gray-400 absolute right-4"
									/>
								</div>
							</div>
							<div className="mt-4 text-right">
								<a
									href="#"
									className="text-blue-600 text-sm font-semibold hover:underline">
									Forgot your password?
								</a>
							</div>

							<div className="mt-8">
								<button
									type="submit"
									className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
									<FontAwesomeIcon icon={faArrowCircleRight} /> Log in
								</button>
							</div>
							<p className="text-sm mt-8 text-center text-gray-800">
								Don't have an account{" "}
								<Link
									to={"/register"}
									className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
									Register here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
