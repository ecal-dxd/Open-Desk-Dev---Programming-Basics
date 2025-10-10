import { createProject } from "../lib/createProject.js";
import { ContentManager } from "../lib/api.js";

async function main() {
	const urlParams = new URLSearchParams(window.location.search);
	const projectId = urlParams.get("id");
	const CMANAGER = await ContentManager({ path: "./../assets/data/" });
	const project = CMANAGER.getProjectByTitle(projectId);
	const container = document.querySelector("main");
	createProject({
		project,
		parentContainer: container,
		nodesList: ["image", "title", "tags", "description", "images"],
	});
}

window.onload = () => {
	main();
};
