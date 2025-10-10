export function toUrlId(str) {
	str = String(str)
		.toLowerCase()
		.replace(/[\s_]+/g, "-") // spaces & underscores to hyphens
		.replace(/[^a-z0-9-]/g, "") // remove all non-alphanumeric, except hyphens
		.replace(/-+/g, "-") // collapse multiple hyphens
		.replace(/^-+|-+$/g, ""); // trim hyphens from start/end
	return str;
}
