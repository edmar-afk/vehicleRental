/* eslint-disable no-unused-vars */import { useState } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faLock, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api"; // Ensure axios is correctly configured in this file
import logo from "../assets/img/logo.png";
import Swal from "sweetalert2";

function Register() {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNum, setMobileNum] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Show SweetAlert2 loading spinner
		const swalInstance = Swal.fire({
			title: "Registering...",
			text: "Please wait while we process your registration.",
			icon: "info",
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		try {
			const res = await api.post("/api/register/", {
				first_name: firstName,
				last_name: lastName,
				username: username,
				mobile_num: mobileNum,
				email: email,
				password: password,
				password2: password2,
			});

			if (res.status === 201) {
				// Close the SweetAlert2 loading spinner
				swalInstance.close();
				Swal.fire({
					title: "Success!",
					text: "You have been registered successfully.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/");
				});
			} else {
				swalInstance.close();
				Swal.fire({
					title: "Error!",
					text: "Registration failed.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			swalInstance.close();
			Swal.fire({
				title: "Error!",
				text: error.response?.data?.detail || "Registration failed",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<>
			<div></div>
			<div className="font-[sans-serif]">
				<div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-12 h-[320px]">
					<div>
						<a href="">
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
								<h3 className="text-3xl font-extrabold text-gray-800">Register</h3>
							</div>

							<div>
								<div className="relative flex items-center">
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="First Name"
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
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Last Name"
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
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Username"
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
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="text"
										value={mobileNum}
										onChange={(e) => setMobileNum(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="09123456789"
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
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Email"
									/>
									<FontAwesomeIcon
										icon={faMailBulk}
										className="absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Password"
									/>
									<FontAwesomeIcon
										icon={faLock}
										className="absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-2">
								<div className="relative flex items-center">
									<input
										type="password"
										value={password2}
										onChange={(e) => setPassword2(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder="Re-type Password"
									/>
									<FontAwesomeIcon
										icon={faLock}
										className="absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-8">
								<button
									type="submit"
									className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
									disabled={loading}>
									{loading ? "Registering..." : "Register"}
								</button>
							</div>
							<p className="text-sm mt-8 text-center text-gray-800">
								Already have account?{" "}
								<Link
									to={"/"}
									className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
									login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
