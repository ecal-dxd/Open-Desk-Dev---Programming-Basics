const grid = {
	numColumns: 2,
	numRows: 1,
};
const ball = {
	radius: 10,
	color: "black",
};

function main() {
	const canvas = document.getElementById("canvas");
	const devicePixelRatio = window.devicePixelRatio || 1;
	const ctx = canvas.getContext("2d");
	let width, height;
	let frameCount = 0;
	const ballsArray = [];

	function init() {
		setCanvasSize();
		createListenerHandler();
		createBalls();
		draw();
	}

	function onClickHandler(ev) {
		let clickOnBall = false;
		const r = ball.radius;
		const mx = ev.clientX * devicePixelRatio;
		const my = ev.clientY * devicePixelRatio;

		for (let i = 0; i < ballsArray.length; i++) {
			const pos = ballsArray[i].getPosition();
			if (pos.x >= mx - r && pos.x <= mx + r) {
				if (pos.y >= my - r && pos.y <= my + r) {
					ballsArray.splice(i, 1);
					clickOnBall = true;
					break;
				}
			}
		}
		if (!clickOnBall) {
			ballsArray.push(
				new Ball({ x: mx, y: my }, ball.radius, "#0000ff", ctx, width, height)
			);
		}
	}
	function windowResizeHandler() {
		setCanvasSize();
		for (let i = 0; i < ballsArray.length; i++) {
			ballsArray[i].resize(width, height);
		}
	}
	function createListenerHandler() {
		window.addEventListener("click", onClickHandler);
		window.addEventListener("resize", windowResizeHandler);
	}

	function createBalls() {
		let sizeCell = {
			column: width / grid.numColumns,
			row: height / grid.numRows,
		};
		let margin = {
			x: sizeCell.column - ball.radius,
			y: sizeCell.row - ball.radius,
		};
		for (let numRow = 0; numRow < grid.numRows; numRow++) {
			for (let numCol = 0; numCol < grid.numColumns; numCol++) {
				let positionBall = {
					x: sizeCell.column * numCol + ball.radius / 2 + margin.x / 2,
					y: sizeCell.row * numRow + ball.radius / 2 + margin.y / 2,
				};
				const elem = new Ball(
					positionBall,
					ball.radius,
					ball.color,
					ctx,
					width,
					height
				);
				ballsArray.push(elem);
			}
		}
	}

	function draw() {
		frameCount++;

		for (let i = 0; i < ballsArray.length - 1; i += 2) {
			ballsArray[i].update();
			ballsArray[i + 1].update();
			const pos1 = ballsArray[i].getPosition();
			const pos2 = ballsArray[i + 1].getPosition();
			ctx.save();
			const gradient = Math.floor(Math.abs(Math.sin(frameCount * 0.001) * 255));
			ctx.lineWidth = 1;
			ctx.strokeStyle = `rgb(${gradient}, ${gradient}, ${gradient})`;
			ctx.beginPath();
			ctx.moveTo(pos1.x, pos1.y);
			ctx.lineTo(pos2.x, pos2.y);
			ctx.stroke();
			ctx.restore();

			// ballsArray[i].draw();
		}

		frameCount++;
		requestAnimationFrame(draw);
	}

	function setCanvasSize() {
		width = window.innerWidth * devicePixelRatio;
		height = window.innerHeight * devicePixelRatio;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width / devicePixelRatio + "px";
		canvas.style.height = height / devicePixelRatio + "px";
	}

	init();
}

window.onload = main;
