const grid = {
	numColumns: 10,
	numRows: 10,
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

	function init() {
		setCanvasSize();
		draw();
	}
	function draw() {
		ctx.fillStyle = "rgba(250,250,250,0.02)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = ball.color;
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
				positionBall = animateBall(
					positionBall,
					sizeCell,
					numCol,
					numRow,
					frameCount
				);

				ctx.beginPath();
				ctx.ellipse(
					positionBall.x,
					positionBall.y,
					ball.radius,
					ball.radius,
					0,
					0,
					2 * Math.PI
				);
				ctx.fill();
				ctx.closePath();
			}
		}
		frameCount++;
		requestAnimationFrame(draw);
	}

	function animateBall(positionBall, sizeCell, numCol, numRow, frameCount) {
		const velocity = 0.01;
		const amplitude = {
			x: sizeCell.row / 2.5,
			y: sizeCell.row / 2.5,
		};
		const difference = {
			x: numCol * 100,
			y: numCol * 100,
		};
		positionBall.x +=
			Math.sin((frameCount + difference.x) * velocity) * amplitude.x;
		positionBall.y +=
			Math.cos((frameCount + difference.y) * velocity) * amplitude.y;
		return positionBall;
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
	}
	window.addEventListener("resize", windowResizeHandler);
	init();
}

window.onload = main;
