import { load } from "../storage/index.mjs";

export function handleLikeIcon(postData) {
	const reactions = postData.reactions;
	const user = load("profile").name;

	let iconClass = "fa-regular";

	if (!reactions || reactions.length === 0) {
		return iconClass;
	}

	// Find user in .reactors and add solid heart icon
	reactions.forEach((reaction) => {
		if (!reaction.reactors) {
			return;
		} else if (reaction.symbol === "❤️") {
			reaction.reactors.includes(user)
				? (iconClass = "fa-solid")
				: (iconClass = "fa-regular");
		}
	});

	return iconClass;
}
