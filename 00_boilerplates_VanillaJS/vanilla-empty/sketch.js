// makeALoop(10, "Lara");

function myApp() {
	const canvas = document.getElementById("app");
	const ctx = canvas.getContext("2d");
	let width = window.innerWidth;
	let height = window.innerHeight;
	console.log("init");
	canvas.width = width;
	canvas.height = height;
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	let frameCount = 0;
	const grid = {
		numCols: 10,
		numRows: 10,
		circles: { radius: 10, color: "blue" },
		backgroundColor: "yellow",
	};
	function draw() {
		frameCount = frameCount + 1;
		ctx.fillStyle = "rgba(255,255,255,0.01)";
		ctx.fillRect(0, 0, width, height);
		console.log(frameCount);
		const cellWidth = width / grid.numCols;
		const cellHeight = height / grid.numRows;
		const marginWidth = cellWidth / 2;
		const marginHeight = cellHeight / 2;

		for (let row = 0; row < grid.numRows; row++) {
			for (let col = 0; col < grid.numCols; col++) {
				ctx.beginPath();
				ctx.fillStyle = grid.circles.color;
				ctx.arc(
					cellWidth * col +
						marginWidth +
						Math.sin((frameCount + col * 100) * 0.01) * 30,
					cellHeight * row +
						marginHeight +
						Math.cos((frameCount + col * 100) * 0.01) * 30,
					grid.circles.radius,
					0,
					2 * Math.PI,
				);
				ctx.fill();
				ctx.closePath();
			}
		}
		requestAnimationFrame(draw);
	}
	draw();
}

window.addEventListener("load", () => {
	myApp();
});
