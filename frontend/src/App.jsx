import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Notifications from "./pages/dashboard/Notifications";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				>
					<Route path="" element={<Home />} />
					<Route path="profile" element={<Profile />} />
					<Route path="settings" element={<Settings />} />
					<Route path="notifications" element={<Notifications />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
