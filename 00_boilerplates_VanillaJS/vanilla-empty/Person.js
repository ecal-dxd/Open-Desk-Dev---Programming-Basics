class Person {
	constructor(name, age, city, year) {
		this.name = name;
		this.city = city;
		console.log(name);
	}

	sayHello() {
		console.log(`hello my name is ${this.name}, I come from ${this.city}`);
	}
}
