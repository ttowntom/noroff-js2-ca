import { updateReaction } from "../api/posts/reactions.mjs";
import { handleLikeIcon } from "./handleLikeIcon.mjs";

export async function handleReactions(postData) {
	const likeCount = document.querySelector(
		`[data-like-count="${postData.id}"]`
	);
	const likeIcon = document.querySelector(`[data-like-icon="${postData.id}"]`);

	try {
		const data = await updateReaction(postData);

		// Find likes
		const likes = {};
		if (data.data.reactions) {
			data.data.reactions.forEach((reaction) => {
				if (reaction.symbol === "❤️") {
					likes.count = reaction.count;
					likes.reactors = reaction.reactors;
				}
			});
		}

		// Set like count
		likeCount.textContent = likes.count || 0;

		// Set like icon
		likeIcon.classList.toggle("fa-regular");
		likeIcon.classList.add(handleLikeIcon(data.data));
	} catch (error) {
		throw new Error(error);
	}
}
