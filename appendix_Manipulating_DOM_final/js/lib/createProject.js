import { toUrlId } from "../utils.js";

export function createProject({ project, parentContainer, nodesList }) {
	const elementsArray = defineNodesList(nodesList);
	const container = document.createElement("div");
	container.classList.add("project-container");
	parentContainer.appendChild(container);
	container.addEventListener("click", () => {
		location.href = "./project.html?id=" + toUrlId(project.title);
	});
	for (let i = 0; i < elementsArray.length; i++) {
		container.appendChild(elementsArray[i]);
	}

	function defineNodesList(nodes) {
		const list = [];
		for (let i = 0; i < nodes.length; i++) {
			switch (nodes[i]) {
				case "title":
					list.push(createTitle(project.title));
					break;
				case "description":
					list.push(createDescription(project.description));
					break;
				case "imageTags":
					list.push(imageTags());
					break;
				case "tags":
					list.push(createTags(project.tags));
					break;
				case "image":
					list.push(createImage(project.images, 1, "thumb"));
					break;
				case "images":
					list.push(createImage(project.images));
					break;
				default:
					console.log("node not defined");
					break;
			}
		}
		return list;
	}

	function createTitle(content) {
		const title = document.createElement("h2");
		title.innerText = content;
		return title;
	}

	function imageTags() {
		const container = document.createElement("div");
		container.classList.add("absolute-image");
		container.style.backgroundImage =
			"url('../assets/images/" + project.images[0] + ".jpeg')";
		const tags = createTags(project.tags, 2);
		container.appendChild(tags);
		return container;
	}

	function createDescription(content) {
		const descriptionContainer = document.createElement("div");
		descriptionContainer.classList.add("desc-container");
		const frDesc = document.createElement("p");
		const enDesc = document.createElement("p");
		enDesc.classList.add("en");
		frDesc.classList.add("fr");
		frDesc.innerText = content.fr;
		enDesc.innerText = content.en;
		descriptionContainer.appendChild(frDesc);
		descriptionContainer.appendChild(enDesc);
		return descriptionContainer;
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

	function createImage(content, limit = content.length, type = "carousel") {
		const container = document.createElement("div");
		container.classList.add("images-container");
		for (let i = 0; i < limit; i++) {
			const image = document.createElement("img");
			image.classList.add(type);
			image.src = `../assets/images/${content[i]}.jpeg`;
			container.appendChild(image);
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

	return { createTag, createTags, createDescription, createProject };
}
