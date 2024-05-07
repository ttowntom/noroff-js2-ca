import { createComment } from "../api/posts/createComment.mjs";
import { commentFormTemplate } from "../templates/commentForm.mjs";
import { alertContainerTemplate } from "../helpers/alertContainer.mjs";

export function handleComment(postData) {
	// Grab document elements
	const postFooter = document.querySelector(
		`[data-footer-id="${postData.id}"]`
	);
	const commentCount = postFooter.querySelector(
		`[data-comment-count="${postData.id}"]`
	);

	// URL Parameters
	const urlParams = new URLSearchParams(window.location.search);
	const singlePost = urlParams.get("id") ? true : false;

	// Render the comment form
	const { container, textarea, saveButton, cancelButton, alertContainer } =
		commentFormTemplate();
	postFooter.append(container);
	postFooter.append(alertContainer);

	// Add listener to the cancel button
	cancelButton.addEventListener("click", () => {
		container.remove();
	});

	// Add listener to the save button
	saveButton.addEventListener("click", () => {
		// Comment on the post
		createComment({
			id: postData.id,
			body: { body: textarea.value },
		}).then((response) => {
			// Handle errors
			if (response.error) {
				console.log("error");
				// Render error message
				postFooter.append(
					alertContainerTemplate(
						"error",
						`There was an error: ${response.error}`
					)
				);

				// Set timeout to remove the alert
				setTimeout(() => {
					alertContainer.classList.add("hidden");
				}, 5000);

				throw new Error(response.error);
			}

			// Handle success
			// Remove the form
			container.remove();

			// Update the comment count
			commentCount.textContent++;

			// Handle multi post page
			if (!singlePost) {
				// Render success message
				postFooter.append(
					alertContainerTemplate("success", `Comment added successfully!`)
				);

				// Set timeout to remove the alert
				setTimeout(() => {
					alertContainer.classList.add("hidden");
				}, 5000);
			} else {
				// Handle single post page
				// Refresh the page
				window.location.reload();
			}
		});
	});
}
