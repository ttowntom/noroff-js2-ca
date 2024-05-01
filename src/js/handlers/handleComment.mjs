import { createComment } from "../api/posts/createComment.mjs";

export function handleComment(postData) {
	const postFooter = document.querySelector(
		`[data-footer-id="${postData.id}"]`
	);
	const commentCount = postFooter.querySelector(
		`[data-comment-count="${postData.id}"]`
	);

	// URL Parameters
	const urlParams = new URLSearchParams(window.location.search);
	const singlePost = urlParams.get("id") ? true : false;

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
	textarea.placeholder = "Add a comment";

	container.append(textarea);

	// Create button container
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add(
		"flex",
		"flex-wrap",
		"md:flex-nowrap",
		"justify-end",
		"space-x-2"
	);

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
	saveButton.textContent = "Add comment";
	textarea.after(saveButton);

	buttonContainer.append(saveButton);
	container.append(buttonContainer);

	postFooter.append(container);

	// Create alert container
	const alertContainer = document.createElement("div");
	alertContainer.classList.add(
		"hidden",
		"w-full",
		"items-center",
		"my-2",
		"p-2",
		"text-darkBlue",
		"bg-red-300",
		"border",
		"border-red-600",
		"rounded-md"
	);
	alertContainer.setAttribute("role", "alert");

	// Create alert text
	const alertText = document.createElement("p");
	alertText.classList.add("text-left", "pl-2");
	alertContainer.append(alertText);

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
				// Render alert
				alertContainer.textContent = `There was an error: ${response.error}`;
				alertContainer.classList.add("bg-red-300", "border-red-600");
				alertContainer.classList.remove(
					"hidden",
					"bg-green-300",
					"border-green-600"
				);
				setTimeout(() => {
					alertContainer.classList.add("hidden");
				}, 5000);

				throw new Error(response.error);
			}
			// Handle success
			// Remove the container
			container.remove();

			// Update the comment count
			commentCount.textContent++;

			// Handle multi post page
			if (!singlePost) {
				alertContainer.textContent = "Comment added successfully!";
				alertContainer.classList.add("bg-green-300", "border-green-600");
				alertContainer.classList.remove(
					"hidden",
					"bg-red-300",
					"border-red-600"
				);
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
