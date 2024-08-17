/* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable no-unused-vars */ import {
	useState,
	useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faLock, faMailBulk, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
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
	const [error, setError] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const navigate = useNavigate();

	// Function to check if passwords match
	const checkPasswordsMatch = () => {
		if (password && password2 && password !== password2) {
			setError("Passwords do not match");
		} else {
			setError("");
		}
	};

	// Update password and check if they match
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	// Update re-type password and check if they match
	const handlePassword2Change = (e) => {
		setPassword2(e.target.value);
	};

	// Use useEffect to check if passwords match and form validity
	useEffect(() => {
		checkPasswordsMatch();

		// Check if all required fields are filled
		if (username && firstName && lastName && email && mobileNum && password && password2 && !error) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	}, [username, firstName, lastName, email, mobileNum, password, password2, error]);

	const handleUsernameChange = (e) => {
		const value = e.target.value.toLowerCase(); // Convert to lowercase
		const filteredValue = value.replace(/[^a-z0-9]/g, ""); // Remove all characters that are not lowercase letters or numbers
		setUsername(filteredValue);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("password2", password2);
		formData.append("mobile_num", mobileNum);

		const role = document.querySelector('input[name="role"]:checked')?.value;
		if (role) {
			formData.append(role, true);
		}

		try {
			const res = await api.post("/api/register/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (res.status === 201) {
				Swal.fire({
					title: "Success!",
					text: "You have been registered successfully.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/login");
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: "Registration failed.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			let errorMessage = "Registration failed";

			if (error.response) {
				if (error.response.data && typeof error.response.data === "object") {
					errorMessage = Object.values(error.response.data).join(" ");
				} else if (error.response.data && error.response.data.detail) {
					errorMessage = error.response.data.detail;
				}
			}

			Swal.fire({
				title: "Error!",
				text: errorMessage,
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

							<p className="text-sm">Are you a?:</p>
							<ul className="grid w-full gap-6 grid-cols-2">
								<li>
									<input
										type="radio"
										id="role-is_staff"
										name="role"
										value="is_staff"
										className="hidden peer"
										defaultChecked
									/>
									<label
										htmlFor="role-is_staff"
										className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
										<div className="block">
											<div className="w-full text-xs font-semibold">Customer</div>
										</div>
										<FontAwesomeIcon icon={faStreetView} />
									</label>
								</li>
								<li>
									<input
										type="radio"
										id="role-is_superuser"
										name="role"
										value="is_superuser"
										className="hidden peer"
									/>
									<label
										htmlFor="role-is_superuser"
										className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
										<div className="block">
											<div className="w-full text-xs font-semibold">Seller</div>
										</div>
										<FontAwesomeIcon icon={faCar} />
									</label>
								</li>
							</ul>

							<div>
								<p className="text-sm mb-1 mt-4">First Name:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
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
								<p className="text-sm mb-1 mt-4">Last Name:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
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
								<p className="text-sm mb-1 mt-4">Username:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="text"
										value={username}
										onChange={handleUsernameChange}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
									/>
									<FontAwesomeIcon
										icon={faMailBulk}
										className="w-[18px] h-[18px] absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-2">
								<p className="text-sm mb-1 mt-4">Email:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="text"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
									/>
									<FontAwesomeIcon
										icon={faMailBulk}
										className="w-[18px] h-[18px] absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-2">
								<p className="text-sm mb-1 mt-4">Mobile Number:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="text"
										value={mobileNum}
										onChange={(e) => setMobileNum(e.target.value)}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
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
								<p className="text-sm mb-1 mt-4">Password:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="password"
										value={password}
										onChange={handlePasswordChange}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
									/>
									<FontAwesomeIcon
										icon={faLock}
										className="w-[18px] h-[18px] absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							<div className="mt-2">
								<p className="text-sm mb-1 mt-4">Repeat Password:</p>
								<div className="relative flex items-center mb-2">
									<input
										type="password"
										value={password2}
										onChange={handlePassword2Change}
										required
										className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
										placeholder=""
									/>
									<FontAwesomeIcon
										icon={faLock}
										className="w-[18px] h-[18px] absolute right-4 text-gray-400"
									/>
								</div>
							</div>
							{error && <p className="text-red-500 mt-2">{error}</p>}
							<div className="flex flex-col items-center justify-between mt-4">
								<button
									type="submit"
									disabled={!canSubmit}
									className={`px-6 py-2 w-full mb-4 text-white font-semibold rounded-md transition-colors ${
										canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 cursor-not-allowed"
									}`}>
									Register
								</button>
								<p>
									Already have an account?
									<Link
										to="/"
										className="text-blue-500 hover:underline ml-2">
										Sign In
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
