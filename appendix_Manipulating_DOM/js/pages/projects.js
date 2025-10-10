import { fetchContent } from "../lib/api.js";

async function main() {
	const content = await fetchContent("./../assets/data/", "content.json");
	const parentContainer = document.getElementById("projects-container");
	for (let i = 0; i < content.projects.length; i++) {
		const container = document.createElement("div");
		container.classList.add("project-container");

		const title = createTitle(i);
		const image = createImage(i);
		console.log(title);
		console.log(image);

		container.appendChild(title);
		container.appendChild(image);
		parentContainer.appendChild(container);
	}

	function createTitle(i) {
		const titleElement = document.createElement("h2");
		titleElement.innerText = content.projects[i].title;
		return titleElement;
	}
	function createImage(i) {
		const imageElement = document.createElement("img");
		const path = "./../assets/images/";
		imageElement.classList.add("thumb");
		const src = content.projects[i].images[0] + ".jpeg";
		imageElement.src = path + src;
		return imageElement;
	}
}

window.onload = () => {
	main();
};
