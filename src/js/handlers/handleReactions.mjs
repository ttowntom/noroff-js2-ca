import { updateReaction } from "../api/posts/reactions.mjs";
import { handleLikeIcon } from "./handleLikeIcon.mjs";

export async function handleReactions(postData) {
	const likeCount = document.querySelector(
		`[data-like-count="${postData.id}"]`
	);
	const likeIcon = document.querySelector(`[data-like-icon="${postData.id}"]`);

	try {
		const data = await updateReaction(postData);
		console.log("Reaction updated:", data.data.reactions);
		handleLikeIcon(data.data);

		likeCount.textContent = data.data.reactions.length;
		// likeIcon.classList.toggle("fa-regular");
		// likeIcon.classList.toggle("fa-solid");
	} catch (error) {
		console.error("Error updating reaction:", error);
	}
}
