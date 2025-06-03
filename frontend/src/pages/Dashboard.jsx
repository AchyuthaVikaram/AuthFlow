import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
	HomeIcon,
	UserIcon,
	Cog6ToothIcon,
	BellIcon,
	PowerIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
	const [user, setUser] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		} else {
			const user = JSON.parse(localStorage.getItem("user"));
			setUser(user);
		}
	}, [navigate]);

	const handleLogout = () => {
		const confirmed = window.confirm("Are you sure you want to log out?");
		if (confirmed) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			toast.success("Logged out successfully!");
			setTimeout(() => {
				navigate("/");
			}, 1500);
		}
	};

	const linkClass = ({ isActive }) =>
		`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 ${
			isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
		}`;

	return (
		<div className="flex flex-col md:flex-row min-h-screen relative">
			<ToastContainer position="top-right" autoClose={1500} />

			{/* Hamburger for mobile */}
			<div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
				<h1 className="text-lg font-bold">Dashboard</h1>
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					{isSidebarOpen ? (
						<XMarkIcon className="w-6 h-6" />
					) : (
						<Bars3Icon className="w-6 h-6" />
					)}
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={`bg-white shadow-md p-4 md:relative absolute z-50 top-0 md:top-auto left-0 h-full md:h-auto w-64 md:w-1/5 transform transition-transform duration-300 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
				}`}
			>
				<div className="mb-6 text-center mt-4 md:mt-0">
					<img
						src="https://i.pravatar.cc/100"
						alt="Profile"
						className="rounded-full w-16 h-16 mx-auto mb-2"
					/>
					<h2 className="font-bold">{user?.fullName || "User"}</h2>
					<p className="text-sm text-gray-500">
						@{user?.email?.split("@")[0] || "guest"}
					</p>
				</div>

				<nav className="space-y-2">
					<NavLink to="" end className={linkClass}>
						<HomeIcon className="h-5 w-5" /> Home
					</NavLink>
					<NavLink to="profile" className={linkClass}>
						<UserIcon className="h-5 w-5" /> Profile
					</NavLink>
					<NavLink to="settings" className={linkClass}>
						<Cog6ToothIcon className="h-5 w-5" /> Settings
					</NavLink>
					<NavLink to="notifications" className={linkClass}>
						<BellIcon className="h-5 w-5" /> Notifications
					</NavLink>
					<button
						onClick={handleLogout}
						className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-100 w-full"
					>
						<PowerIcon className="h-5 w-5" /> Logout
					</button>
				</nav>
			</div>

			{/* Main Content */}
			<div className="w-full md:w-4/5 bg-gray-50 p-6 overflow-y-auto flex-grow">
				<Outlet />
			</div>
		</div>
	);
}

export default Dashboard;
