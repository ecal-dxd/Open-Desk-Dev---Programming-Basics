const grid = {
	numColumns: 10,
	numRows: 10,
};
const ball = {
	radius: 100,
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
		createBalls();
		draw();
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

				elem.setup();
			}
		}
	}

	function draw() {
		ctx.fillStyle = "rgba(250,250,250,0.02)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = ball.color;

		for (let i = 0; i < ballsArray.length; i++) {
			ballsArray[i].update();
			ballsArray[i].draw();
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

	function windowResizeHandler() {
		setCanvasSize();
		for (let i = 0; i < ballsArray.length; i++) {
			ballsArray[i].resize(width, height);
		}
	}
	window.addEventListener("resize", windowResizeHandler);
	init();
}

window.onload = main;
