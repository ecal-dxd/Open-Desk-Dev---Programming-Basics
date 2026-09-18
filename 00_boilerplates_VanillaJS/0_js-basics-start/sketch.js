function main() {
	const canvas = document.getElementById("canvas");
	const devicePixelRatio = window.devicePixelRatio || 1;
	const ctx = canvas.getContext("2d");
	let width, height;

	function init() {
		setCanvasSize();
		ctx.fillStyle = "rgb(250,250,250)";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "black";
		ctx.ellipse(width / 2, height / 2, 100, 100, 0, 0, 2 * Math.PI);
		ctx.fill();
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
		init();
	}
	window.addEventListener("resize", windowResizeHandler);
	init();
}

window.onload = main;
