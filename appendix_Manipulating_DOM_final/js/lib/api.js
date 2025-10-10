import { toUrlId } from "../utils.js";

export async function ContentManager({
	path = "./assets/data/",
	fileName = "content.json",
} = {}) {
	const data = await fetchContent(path, fileName);

	function getProjects() {
		return data?.projects || [];
	}

	function getProjectByTitle(title) {
		title = toUrlId(title);
		return (
			data?.projects.find((project) => toUrlId(project.title) === title) || null
		);
	}

	function getAllDatas() {
		return data || {};
	}

	function getCredits() {
		return data.credits || {};
	}

	return { getProjects, getAllDatas, getCredits, getProjectByTitle };
}

async function fetchContent(path, fileName) {
	try {
		const response = await fetch(path + fileName);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching content:", error);
		return null;
	}
}
