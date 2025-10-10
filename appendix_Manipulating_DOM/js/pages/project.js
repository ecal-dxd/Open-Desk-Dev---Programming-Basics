import { createProject } from "../lib/createProject.js";
import { ContentManager } from "../lib/api.js";

async function main() {
	const urlParams = new URLSearchParams(window.location.search);
	const projectId = urlParams.get("id");
}

window.onload = () => {
	main();
};
