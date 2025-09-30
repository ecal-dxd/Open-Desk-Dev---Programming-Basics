function map(num, start1, stop1, start2, stop2) {
	return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
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
	const circlesArray = [];
	const numCircles = 10;

	const columnWidth = width / numCircles;
	const columnHeight = height / numCircles;

	for (let rowPosition = 0; rowPosition < numCircles; rowPosition++) {
		for (
			let columnPosition = 0;
			columnPosition < numCircles;
			columnPosition = columnPosition + 1
		) {
			const positionY = columnHeight * rowPosition + columnHeight / 2;
			const positionX = columnWidth * columnPosition + columnWidth / 2;
			createCircle(positionX, positionY);
		}
	}

	function createCircle(positionX, positionY) {
		const minmax = [-1, 1];
		const mappedX = map(Math.random(), 0, 1, minmax[0], minmax[1]);
		const mappedY = map(Math.random(), 0, 1, minmax[0], minmax[1]);
		const mappedRadius = map(Math.random(), 0, 1, 10, 50);
		const mappedColor = map(Math.random(), 0, 1, 0, 255);
		const circle = {
			x: positionX,
			y: positionY,
			speedX: mappedX,
			speedY: mappedY,
			radius: mappedRadius,
			color: "rgb(0,0," + mappedColor + ")",
		};

		console.log(circle.color);
		circlesArray.push(circle);
	}

	function drawCircles() {
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "rgba(255,255,255,0.05)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "black";

		const columnWidth = width / numCircles;
		const columnHeight = height / numCircles;
		for (let i = 0; i < circlesArray.length; i++) {
			// console.log(circlesArray[i]);
			const elem = circlesArray[i];
			elem.x = elem.x + elem.speedX;
			elem.y = elem.y + elem.speedY;
			ctx.beginPath();
			ctx.fillStyle = elem.color;
			ctx.arc(elem.x, elem.y, elem.radius, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();


			if (elem.x > width - elem.radius) {
				elem.speedX = -elem.speedX;
			}
			if (elem.x < elem.radius) {
				elem.speedX = -elem.speedX;
			}
			if (elem.y > height - elem.radius) {
				elem.speedY = -elem.speedY;
			}
			if (elem.y < elem.radius) {
				elem.speedY = -elem.speedY;
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
