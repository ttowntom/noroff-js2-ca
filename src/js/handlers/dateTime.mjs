/**
 * Returns the date and time in a human-readable format
 * @param {Date} timestamp - The timestamp to convert to a human-readable format
 * @returns {string} - The date and time in a human-readable format
 * ``` js
 * const date = new Date();
 * dateTime(date);
 * // Returns a string with the current date and time
 * ```
 */

export function dateTime(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
