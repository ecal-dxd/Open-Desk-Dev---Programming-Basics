class Ball {
	constructor(position, radius, color, ctx, width, height) {
		this.x = position.x;
		this.y = position.y;
		this.radius = radius;
		this.color = color;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.setup();
	}

	setup() {
		const max = 2;
		const min = -2;
		this.velocity = {
			x: Math.random() * (max - min) + min,
			y: Math.random() * (max - min) + min,
		};
	}

	getPosition() {
		return { x: this.x, y: this.y };
	}
	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.ellipse(
			this.x,
			this.y,
			this.radius,
			this.radius,
			0,
			0,
			2 * Math.PI
		);
		this.ctx.fill();
		this.ctx.closePath();
	}

	update() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		if (this.x > this.width - this.radius || this.x < this.radius) {
			this.velocity.x *= -1;
		}
		if (this.y > this.height - this.radius || this.y < this.radius) {
			this.velocity.y *= -1;
		}
	}
	resize(width, height) {
		this.width = width;
		this.height = height;
	}
}
