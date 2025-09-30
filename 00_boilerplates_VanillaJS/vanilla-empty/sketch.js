function myApp() {
	const myCanvas = document.createElement("canvas");
	document.body.appendChild(myCanvas);
	const width = window.innerWidth;
	const height = window.innerHeight;
	const ctx = myCanvas.getContext("2d");
	let frameCount = 0;
	myCanvas.width = width;
	myCanvas.height = height;
	myCanvas.style.width = width + "px";
	myCanvas.style.height = height + "px";

	function drawCircles() {
		// ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "rgba(255,255,255,0.05)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "black";

		const numCircles = 10;
		const columnWidth = width / numCircles;
		const columnHeight = height / numCircles;
		const move = { velocity: 0.01, amplitude: 100 };
		for (let rowPosition = 0; rowPosition < 10; rowPosition++) {
			for (
				let columnPosition = 0;
				columnPosition < numCircles;
				columnPosition = columnPosition + 1
			) {
				const movingPositionY = Math.cos(
					(frameCount + columnPosition * 100) * move.velocity
				);
				console.log(movingPositionY);
				const positionY =
					columnHeight * rowPosition +
					columnHeight / 2 +
					movingPositionY * move.amplitude;

				const movingPositionX = Math.sin(
					(frameCount + columnPosition * 100) * move.velocity
				);
				const positionX =
					columnWidth * columnPosition +
					columnWidth / 2 +
					movingPositionX * move.amplitude;
				ctx.beginPath();
				ctx.arc(positionX, positionY, 10, 0, 2 * Math.PI);
				ctx.fill();
				ctx.closePath();
			}
		}

		frameCount = frameCount + 1;

		requestAnimationFrame(drawCircles);
	}

	drawCircles();
}

window.addEventListener("load", () => {
	myApp();
});
