import { fetchContent } from "../lib/api.js";

async function main() {
	const content = await fetchContent("./../assets/data/", "content.json");
	const projectsContainer = document.getElementById("projects-container");
	const tagsArray = [];
	for (let i = 0; i < content.projects.length; i++) {
		const container = document.createElement("div");
		container.classList.add("project-container");
		const image = createImage(i);
		getAllTags(content.projects[i].tags);
		container.appendChild(image);
		projectsContainer.appendChild(container);
	}


	const parentTagContainer = document.getElementById("tags-container");

	for (let i = 0; i < tagsArray.length; i++) {
		const tagButton = generateTagButton(tagsArray[i]);
		parentTagContainer.appendChild(tagButton);
	}

	function getAllTags(tags) {
		for (let i = 0; i < tags.length; i++) {
			if (!tagsArray.includes(tags[i])) {
				tagsArray.push(tags[i]);
			}
		}
	}

	function generateTagButton(content) {
		const button = document.createElement("button");
		button.innerText = content;
		button.classList.add("tag");
		button.addEventListener("click", () => {
			onTagClickHandler(content, button);
		});
		return button;
	}

	function onTagClickHandler(tag, button) {
		// Filter all projects
		console.log(tag, button);
		projectsContainer.innerHTML = "";
	}

	function createProject(project) {}

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
