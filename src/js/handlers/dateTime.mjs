export function dateTime(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		// hour: "numeric",
		// minute: "numeric",
	});
}
