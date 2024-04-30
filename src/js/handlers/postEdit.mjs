import { updatePost } from "../api/posts/update.mjs";
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

	// Create container
	const container = document.createElement("div");
	container.classList.add("flex", "flex-col", "space-y-2");

	// Create a textarea element
	const textarea = document.createElement("textarea");
	textarea.name = "body";
	textarea.classList.add(
		"w-full",
		"my-2",
		"p-3",
		"focus:outline-none",
		"dark:bg-slate-800",
		"text-darkBlue",
		"dark:text-gray-200"
	);
	textarea.value = postBody.textContent;

	container.append(textarea);

	// Create media/button container
	const mediaButtonContainer = document.createElement("div");
	mediaButtonContainer.classList.add(
		"flex",
		"flex-wrap",
		"md:flex-nowrap",
		"space-x-2"
	);

	// Create media url input
	const mediaInput = document.createElement("input");
	mediaInput.type = "url";
	mediaInput.name = "media";
	!postMedia
		? (mediaInput.placeholder = "Enter media URL")
		: (mediaInput.value = postMedia.src);
	mediaInput.classList.add(
		"flex-grow",
		"mr-3",
		"p-3",
		"text-sm",
		"focus:outline-none",
		"dark:bg-slate-800",
		"text-darkBlue",
		"dark:text-gray-200",
		"border",
		"border-gray-200",
		"dark:border-gray-600",
		"rounded-lg"
	);

	mediaButtonContainer.append(mediaInput);

	// Create button container
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("flex", "justify-end", "space-x-2");

	// Create a cancel button
	const cancelButton = document.createElement("button");
	cancelButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-red-500",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-red-600",
		"dark:hover:bg-red-800"
	);
	cancelButton.textContent = "Cancel";
	buttonContainer.append(cancelButton);

	// Create a save button
	const saveButton = document.createElement("button");
	saveButton.classList.add(
		"py-2",
		"px-5",
		"mt-3",
		"bg-greenPrimary",
		"text-white",
		"font-bold",
		"rounded-full",
		"shadow-sm",
		"hover:bg-greenHover",
		"dark:hover:bg-greenHoverLight"
	);
	saveButton.textContent = "Update post";
	textarea.after(saveButton);

	buttonContainer.append(saveButton);
	mediaButtonContainer.append(buttonContainer);
	container.append(mediaButtonContainer);

	postWrapper.replaceWith(container);

	// Add listener to the cancel button
	cancelButton.addEventListener("click", () => {
		container.replaceWith(postWrapper);
	});

	// Add listener to the save button
	saveButton.addEventListener("click", () => {
		function handleMediaInput() {
			if (mediaInput.value) {
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
