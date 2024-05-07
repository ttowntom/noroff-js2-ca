export function editPostFormTemplate(postBody, postMedia) {
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

	return { container, textarea, mediaInput, saveButton, cancelButton };
}
