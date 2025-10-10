function map(num, start1, stop1, start2, stop2) {
	return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
function myApp() {
	// const john = new Person("john", 25, "Lausanne", 1980);
	// const jane = new Person("jane", 30, "Berlin", 1970);
	// console.log(john);

	// john.sayHello();
	// jane.sayHello();

	const myCanvas = document.createElement("canvas");
	document.body.appendChild(myCanvas);
	const width = window.innerWidth;
	const height = window.innerHeight;
	const ctx = myCanvas.getContext("2d");

	window.addEventListener("click", onClickHandler);

	// window.addEventListener("click", onClickHandler);

	function onClickHandler(event) {
		const mouseX = event.clientX;
		const mouseY = event.clientY;
		console.log(mouseX, mouseY);

		for (let i = 0; i < circlesArray.length; i++) {
			const c = circlesArray[i];
			if (
				mouseX >= c.x - c.radius &&
				mouseX <= c.x + c.radius &&
				mouseY >= c.y - c.radius &&
				mouseY <= c.y + c.radius
			) {
				c.isClicked();
				break;
			}
		}
	}
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

		const c = circle;

		const object = new Ball(
			c.x,
			c.y,
			c.speedX,
			c.speedY,
			c.radius,
			c.color,
			ctx,
			width,
			height
		);

		object.getPosition();

		circlesArray.push(object);
	}

	function drawCircles() {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "rgba(255,255,255,0.05)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "black";

		for (let i = 0; i < circlesArray.length; i++) {
			circlesArray[i].update();
			circlesArray[i].draw();
		}

		frameCount = frameCount + 1;
		requestAnimationFrame(drawCircles);
	}

	drawCircles();
}

window.addEventListener("load", () => {
	myApp();
});
