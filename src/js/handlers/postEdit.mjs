import { updatePost } from "../api/posts/update.mjs";
import { alertContainerTemplate } from "../helpers/alertContainer.mjs";
import { editPostFormTemplate } from "../templates/editPostForm.mjs";
import { dateTime } from "./dateTime.mjs";

export function editPost(postData) {
	// Get the post body elements
	const postWrapper = document.querySelector(`[data-body-id="${postData.id}"]`);
	const postBody = document.querySelector(`[data-body-data="${postData.id}"]`);
	const postMedia = document.querySelector(
		`[data-media-data="${postData.id}"]`
	);
	const postDate = document.querySelector(`[data-post-date="${postData.id}"]`);

	// Hide post menu
	const userPostMenu = document.querySelector(
		`[data-menu-id="${postData.id}"]`
	);
	userPostMenu.classList.add("hidden");

	// Create form
	const { container, saveButton, cancelButton, textarea, mediaInput } =
		editPostFormTemplate(postBody, postMedia);

	postWrapper.replaceWith(container);

	// Add listener to the cancel button
	cancelButton.addEventListener("click", () => {
		container.replaceWith(postWrapper);
	});

	// Add listener to the save button
	saveButton.addEventListener("click", () => {
		function handleMediaInput() {
			if (mediaInput && mediaInput.value) {
				return { url: mediaInput.value, alt: "Image uploaded by user" };
			}
			return null;
		}

		// Update the post
		updatePost({
			id: postData.id,
			body: textarea.value,
			media: handleMediaInput(),
		}).then((response) => {
			// Handle errors
			if (response.error) {
				// Show error message
				container.append(alertContainerTemplate("error", response.error));
				throw new Error(response.error);
			}
			// Handle success
			// Replace the input container with the updated post
			const updatedPost = document.createElement("div");
			updatedPost.dataset.bodyId = response.data.id;
			updatedPost.classList.add("flex", "flex-col", "space-y-2");

			const updatedContent = document.createElement("p");
			updatedContent.classList.add("mt-3", "dark:text-gray-200", "break-words");
			updatedContent.textContent = response.data.body;
			updatedContent.dataset.bodyData = response.data.id;
			updatedPost.append(updatedContent);

			if (response.data.media && response.data.media.url) {
				const updatedMedia = document.createElement("img");
				updatedMedia.src = response.data.media.url;
				updatedMedia.alt = response.data.media.alt;
				updatedMedia.dataset.mediaData = response.data.id;
				updatedMedia.classList.add("w-full", "rounded-lg");
				updatedPost.append(updatedMedia);
			}

			container.replaceWith(updatedPost);

			// Update the post date
			const created = response.data.created;
			const updated = response.data.updated;

			if (updated > created) {
				const updatedDate = document.createElement("time");
				updatedDate.dateTime = updated;
				// Text content formatted as "Month Day, Year"
				updatedDate.textContent = dateTime(updated);
				postDate.textContent = `${dateTime(created)} | (edited ${
					updatedDate.textContent
				})`;
			}
		});
	});
}
