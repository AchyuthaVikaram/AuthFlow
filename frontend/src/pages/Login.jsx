import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backend_URL from "../constants";

function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const { email, password } = formData;
		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (!email || !password) {
			return "All fields are required.";
		}
		if (!emailRegex.test(email)) {
			return "Invalid email format.";
		}
		if (password.length < 6) {
			return "Password must be at least 6 characters.";
		}
		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const validationError = validateForm();
		if (validationError) {
			setLoading(false);
			toast.error(validationError);
			return;
		}

		try {
			const response = await axios.post(`${Backend_URL}/api/auth/login`, {
				email: formData.email,
				password: formData.password,
			});

			// Store token or user info in localStorage if needed
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			toast.success("Login successful! Redirecting...");
			setTimeout(() => navigate("/dashboard"), 2000); // adjust path as needed
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data?.error || "Login failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-sky-50">
			<ToastContainer />
			<div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-right mb-6">Welcome back!</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-md text-left ml-1.5 mb-2"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-md text-left ml-1.5 mb-2"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
					>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>
				<p className="text-sm text-right mt-4 text-gray-600">
					Don't have an account?{" "}
					<Link to="/signup" className="text-blue-600 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
