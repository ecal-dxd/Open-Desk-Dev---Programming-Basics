import { fetchContent } from "../lib/api.js";

async function main() {
	const content = await fetchContent("./../assets/data/", "content.json");
	const projectsContainer = document.getElementById("projects-container");
	const tagsArray = [];
	for (let i = 0; i < content.projects.length; i++) {
		createProject(content.projects[i]);
		getAllTags(content.projects[i].tags);
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
		projectsContainer.innerHTML = "";
		for (let i = 0; i < content.projects.length; i++) {
			if (content.projects[i].tags.includes(tag)) {
				createProject(content.projects[i]);
			}
		}
	}

	function createProject(p) {
		const container = document.createElement("div");
		container.classList.add("project-container");
		const image = imageTags(p);
		container.appendChild(image);
		projectsContainer.appendChild(container);
	}

	function createTitle(title) {
		const container = document.createElement("div");
		container.classList.add("title-container");
		const titleElement = document.createElement("h2");
		titleElement.innerText = title;
		container.appendChild(titleElement);
		return container;
	}

	function imageTags(project) {
		const container = document.createElement("div");
		container.classList.add("absolute-image");
		container.style.backgroundImage =
			"url('../assets/images/" + project.images[0] + ".jpeg')";
		const tags = createTags(project.tags);
		const title = createTitle(project.title);
		container.appendChild(title);
		container.appendChild(tags);
		return container;
	}

	function createTags(content, limit = content.length) {
		const tagArray = [];
		const container = document.createElement("div");
		container.classList.add("tags-container");
		for (let i = 0; i < limit; i++) {
			const tag = createTag(content[i]);
			tagArray.push(tag);
			container.appendChild(tag);
		}
		return container;
	}

	function createTag(content) {
		const container = document.createElement("div");
		container.classList.add("tag-container");
		const text = document.createElement("p");
		text.classList.add("tag-text");
		text.innerText = content;
		container.appendChild(text);
		return container;
	}
}

window.onload = () => {
	main();
};
