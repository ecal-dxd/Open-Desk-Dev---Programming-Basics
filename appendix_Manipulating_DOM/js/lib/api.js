export async function fetchContent(path, src) {
	const response = await fetch(path + src);
	const datas = await response.json();
	return datas;
}

// complete solution
// async function fetchContent(path, fileName) {
// 	try {
// 		const response = await fetch(path + fileName);
// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching content:", error);
// 		return null;
// 	}
// }
