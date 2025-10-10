import { ContentManager } from "../lib/api.js";
import { createProject } from "../lib/createProject.js";

async function main() {
	const CMANAGER = await ContentManager({ path: "./../assets/data/" });
	const projects = CMANAGER.getProjects();
	const container = document.querySelector("main");

	for (let i = 0; i < projects.length; i++) {
		createProject({
			project: projects[i],
			parentContainer: container,
			nodesList: ["imageTags"],
		});
	}
}

window.onload = () => {
	main();
};
