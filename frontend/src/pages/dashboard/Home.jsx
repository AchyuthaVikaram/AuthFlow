function Home() {
	const happenings = [
		{
			category: "Trending",
			title: "Tech advancements in 2024",
			tweets: "100K+ tweets",
			img: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			category: "Trending",
			title: "Global health updates",
			tweets: "50K+ tweets",
			img: "https://images.unsplash.com/photo-1740479050129-7fef21254518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdsb2JhbCUyMGhlYWx0aHxlbnwwfHwwfHx8Mg%3D%3D",
		},
		{
			category: "Sports",
			title: "Champions League final",
			tweets: "75K+ tweets",
			img: "https://images.unsplash.com/photo-1702849499376-2606073a4353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoYW1waW9ucyUyMGxlYWd1ZSUyMGZpbmFsfGVufDB8fDB8fHwy",
		},
	];

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Home</h1>

			<input
				type="text"
				placeholder="Search"
				className="w-full mb-6 p-2 border rounded-lg"
			/>

			<h2 className="text-2xl text-left font-semibold mb-3">Stories</h2>
			<div className="flex space-x-4 mb-6">
				{["Olivia", "Ethan", "Ava", "Noah", "Isabella", "Liam", "Mia"].map(
					(name, idx) => (
						<div key={idx} className="text-center">
							<img
								src={`https://randomuser.me/api/portraits/${
									idx % 2 === 0 ? "women" : "men"
								}/${idx + 10}.jpg`}
								alt={name}
								className="w-14 h-14 rounded-full mx-auto"
							/>
							<p className="text-sm mt-1">{name}</p>
						</div>
					)
				)}
			</div>

			{/* What's happening section */}
			<h2 className="text-2xl text-left font-semibold mt-4 mb-4">What’s happening</h2>
			<div className="space-y-6">
				{happenings.map(({ category, title, tweets, img }, idx) => (
					<div
						key={idx}
						className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
					>
						{/* Left half - text */}
						<div className="md:w-3/5 text-left">
							<p className="text-sm text-gray-500">{category}</p>
							<p className="font-medium text-lg">{title}</p>
							<p className="text-sm text-gray-500">{tweets}</p>
						</div>

						{/* Right half - image */}
						<div className="md:w-2/5">
							<img
								src={img}
								alt={title}
								className="rounded-lg w-full h-40 object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
