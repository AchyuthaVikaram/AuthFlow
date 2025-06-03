import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backend_URL from "../constants";

function Signup() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/dashboard");
		}
	}, []);

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const { fullName, email, password, confirmPassword } = formData;
		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (!fullName || !email || !password || !confirmPassword) {
			return "All fields are required.";
		}
		if (!emailRegex.test(email)) {
			return "Invalid email format.";
		}
		if (password.length < 6) {
			return "Password must be at least 6 characters.";
		}
		if (password !== confirmPassword) {
			return "Passwords do not match.";
		}
		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const validationError = validateForm();
		if (validationError) {
			setLoading(false);
			toast.error(validationError);
			return;
		}

		try {
			const response = await axios.post(`${Backend_URL}/api/auth/signup`, {
				fullName: formData.fullName,
				email: formData.email,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			});
			toast.success("Signup successful! Redirecting to login...");
			setTimeout(() => navigate("/"), 2000);
		} catch (err) {
			toast.error(err.response?.data?.error || "Signup failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-sky-50">
			<ToastContainer />
			<div className=" bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-right mb-6">
					Create your account
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="fullname"
							className="block text-md text-left ml-1.5 mb-2"
						>
							Full Name
						</label>
						<input
							type="text"
							name="fullName"
							id="fullname"
							placeholder="Full Name"
							value={formData.fullName}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
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
							id="email"
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
							id="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="confirmpassword"
							className="block text-md text-left ml-1.5 mb-2"
						>
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmpassword"
							placeholder="Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
					>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
				</form>
				<p className="text-sm text-right mt-4 text-gray-600">
					Already have an account?{" "}
					<Link to="/" className="text-blue-600 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;
