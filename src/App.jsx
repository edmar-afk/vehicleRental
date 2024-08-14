/* eslint-disable no-unused-vars */
import NoInterConnection from "./components/NoInternetConnection";
import Login from "./routes/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Profile from './routes/Profile'
import Messages from './routes/Messages'
import PostRent from './routes/PostRent'
import Rental from './routes/Rental'

function Logout() {
	localStorage.clear();
	return <Navigate to="/" />;
}

function RegisterAndLogout() {
	localStorage.clear();
	return <Register />;
}

function App() {
	return (
		<>
			<NoInterConnection>
				<BrowserRouter>
					<Routes>
						<Route
							path="/home"
							element={
								<ProtectedRoute>
									
									<Home />
									<Navbar />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<>
									<Profile />
									<Navbar />
								</>
							}
						/>
						<Route
							path="/rental"
							element={
								<>
									<Rental />
									<Navbar />
								</>
							}
						/>
						<Route
							path="/messages"
							element={
								<>
									<Messages />
									<Navbar />
								</>
							}
						/>
						<Route
							path="/postRent"
							element={
								<>
									<PostRent />
									<Navbar />
								</>
							}
						/>
						<Route
							path="/"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<RegisterAndLogout />}
						/>
						<Route
							path="*"
							element={<NotFound />}
						/>
						<Route
							path="/logout"
							element={<Logout />}
						/>
					</Routes>
				</BrowserRouter>
			</NoInterConnection>
		</>
	);
}

export default App;
