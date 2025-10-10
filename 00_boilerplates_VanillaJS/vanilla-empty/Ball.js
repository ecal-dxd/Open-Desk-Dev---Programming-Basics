class Ball {
	constructor(x, y, speedX, speedY, radius, color, ctx, width, height) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
		this.radius = radius;
		this.color = color;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.hasBeenClicked = false;
	}

	getPosition() {}

	draw() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		if (this.hasBeenClicked) {
			this.ctx.fillRect(this.x, this.y, this.radius, this.radius);
		} else {
			this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		}
		this.ctx.fill();
		this.ctx.closePath();
	}

	isClicked() {
		this.hasBeenClicked = true;
		this.changeColor();
	}

	changeColor() {
		if (this.radius > 20) {
			this.color = `rgb(0, 255,0)`;
		} else {
			// const value = map(Math.random(), 0, 1, 0, 255);
			this.color = `rgb(255, 0,0)`;
		}
	}

	update() {
		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;

		if (this.x > this.width - this.radius || this.x < this.radius) {
			this.speedX = -this.speedX;
		}

		if (this.y > this.height - this.radius || this.y < this.radius) {
			this.speedY = -this.speedY;
		}
	}
}
