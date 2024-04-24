import { API_SOCIAL_URL } from "../api/constants.mjs";
import * as postAPI from "../api/posts/index.mjs";
import { dateTime } from "../handlers/dateTime.mjs";
import { editPost } from "../handlers/postEdit.mjs";

export function postTemplate(postData) {
	// If there is no body, use the title as the body
	if (!postData.body) {
		postData.body = postData.title;
	}

	// Create wrapper
	const post = document.createElement("article");
	post.classList.add(
		"relative",
		"flex",
		"flex-col",
		"my-4",
		"p-4",
		"bg-white",
		"border",
		"dark:bg-slate-800",
		"border-gray-200",
		"dark:border-gray-600",
		"rounded-md",
		"shadow-sm"
	);

	// Create header
	const header = document.createElement("div");
	header.classList.add("flex", "justify-between");
	// Create header row
	const row = document.createElement("div");
	row.classList.add("flex");
	// Create profile image
	const profileImage = document.createElement("img");
	profileImage.src = postData.author.avatar.url;
	profileImage.alt = postData.author.name + " profile image";
	profileImage.classList.add("h-12", "w-12", "rounded-full");

	// Create post metadata
	const metadata = document.createElement("div");
	metadata.classList.add("flex", "flex-col", "ms-5");
	// Create author name link
	const authorNameLink = document.createElement("a");
	authorNameLink.href = `${API_SOCIAL_URL}/profiles/${postData.author.name}`;
	// Create author name text
	const authorNameText = document.createElement("h3");
	authorNameText.classList.add(
		"text-greenPrimary",
		"text-xl",
		"font-bold",
		"hover:text-greenHover",
		"dark:hover:text-greenHoverLight"
	);
	authorNameText.textContent = postData.author.name;
	authorNameLink.append(authorNameText);
	metadata.append(authorNameLink);
	// Create post created date
	const postDate = document.createElement("time");
	postDate.dataset.postDate = postData.id;
	postDate.dateTime = postData.created;
	// Text content formatted as "Month Day, Year"
	postDate.textContent = dateTime(postData.created);
	postDate.classList.add("text-sm", "text-gray-400", "font-light");
	metadata.append(postDate);

	// Create post updated date
	if (postData.updated > postData.created) {
		const updatedDate = document.createElement("time");
		updatedDate.dateTime = postData.updated;
		// Text content formatted as "Month Day, Year"
		updatedDate.textContent = dateTime(postData.updated);
		postDate.textContent = `${postDate.textContent} | (edited ${updatedDate.textContent})`;
	}

	// Append to header row
	row.append(profileImage);
	row.append(metadata);

	header.append(row);

	// If post author is the current user, add edit options
	const postAuthor = postData.author.name;
	const currentUser = JSON.parse(localStorage.getItem("profile")).name;
	if (postAuthor === currentUser) {
		// Create options button
		const optionsButton = document.createElement("button");
		optionsButton.classList.add(
			"self-start",
			"text-gray-400",
			"hover:text-greenPrimary"
		);
		optionsButton.ariaLabel = "Edit post";
		// Create options icon
		const optionsIcon = document.createElement("i");
		optionsIcon.classList.add("fa-solid", "fa-ellipsis-v");
		optionsButton.append(optionsIcon);
		header.append(optionsButton);

		// Create options menu
		const userPostMenu = document.createElement("nav");
		userPostMenu.dataset.menuId = postData.id;
		userPostMenu.classList.add(
			"hidden",
			"absolute",
			"top-0",
			"right-0",
			"p-6",
			"pt-9",
			"pe-16",
			"bg-white",
			"border",
			"dark:bg-slate-900",
			"border-gray-200",
			"dark:border-gray-600",
			"rounded-md",
			"shadow-2xl"
		);
		// Create close button
		const closeBtn = document.createElement("button");
		closeBtn.classList.add("absolute", "right-2", "top-2");
		closeBtn.ariaLabel = "Close menu";
		// Create close icon
		const closeIcon = document.createElement("i");
		closeIcon.classList.add(
			"fa-solid",
			"fa-circle-xmark",
			"text-xl",
			"text-red-500",
			"dark:text-red-300",
			"hover:text-red-800",
			"dark:hover:text-red-500"
		);
		closeBtn.append(closeIcon);
		userPostMenu.append(closeBtn);

		// Create nav ul
		const userMenuList = document.createElement("ul");
		userMenuList.classList.add("space-y-3");
		// Create edit option
		const editOption = document.createElement("li");
		editOption.classList.add("flex", "items-center");
		// Create edit button
		const editButton = document.createElement("button");
		editButton.classList.add("flex", "items-center", "group");
		// Create edit icon
		const editIcon = document.createElement("i");
		editIcon.classList.add(
			"fa-solid",
			"fa-pen-to-square",
			"text-greenPrimary",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		editButton.append(editIcon);
		// Create edit text
		const editText = document.createElement("span");
		editText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-greenHover",
			"dark:group-hover:text-greenHoverLight"
		);
		editText.textContent = "Edit post";
		editButton.append(editText);
		editOption.append(editButton);
		userMenuList.append(editOption);

		// Create delete option
		const deleteOption = document.createElement("li");
		deleteOption.classList.add("flex", "items-center");
		// Create delete button
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("flex", "items-center", "group");
		// Create delete icon
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add(
			"fa-solid",
			"fa-delete-right",
			"text-greenPrimary",
			"group-hover:text-red-800",
			"dark:group-hover:text-red-500"
		);
		deleteButton.append(deleteIcon);
		// Create delete text
		const deleteText = document.createElement("span");
		deleteText.classList.add(
			"ms-2",
			"text-greenDark",
			"dark:text-gray-200",
			"group-hover:text-red-800",
			"dark:group-hover:text-red-500"
		);
		deleteText.textContent = "Delete post";
		deleteButton.append(deleteText);
		deleteOption.append(deleteButton);
		userMenuList.append(deleteOption);

		// Add event listener to the edit button
		editButton.addEventListener("click", () => {
			// Edit the post
			editPost(postData);
		});

		// Add event listener to the delete button
		deleteButton.addEventListener("click", () => {
			// Remove post from the DB
			postAPI.removePost(postData.id);
			// Remove post from the DOM
			post.remove();
		});

		userPostMenu.append(userMenuList);
		row.append(userPostMenu);

		// Add event listener to options button
		optionsButton.addEventListener("click", () => {
			userPostMenu.classList.remove("hidden");
		});
		// Add event listener to close button
		closeBtn.addEventListener("click", () => {
			userPostMenu.classList.add("hidden");
		});
		// Clicking outside of the menu will close it
		document.addEventListener("click", function (event) {
			if (
				!userPostMenu.contains(event.target) &&
				!optionsButton.contains(event.target)
			) {
				userPostMenu.classList.add("hidden");
			}
		});
	}

	post.append(header);

	// Create post link wrapper
	const postLink = document.createElement("a");
	postLink.href = `/feed/post/?id=${postData.id}`;
	postLink.dataset.bodyId = postData.id;

	// Create post content
	const content = document.createElement("p");
	content.dataset.bodyData = postData.id;
	content.classList.add("mt-3", "dark:text-gray-200", "break-words");
	content.textContent = postData.body;
	postLink.append(content);

	// Create post media
	if (postData.media) {
		const media = document.createElement("img");
		media.src = postData.media.url;
		media.alt = postData.media.alt;
		media.classList.add("mt-3", "w-full", "h-auto", "rounded-md");
		postLink.append(media);
	}

	post.append(postLink);

	// Create post footer
	const footer = document.createElement("div");
	footer.classList.add("flex", "space-x-5", "mt-3");
	// Create like button
	const likeButton = document.createElement("button");
	likeButton.classList.add(
		"flex",
		"items-center",
		"text-gray-400",
		"hover:text-greenPrimary",
		"dark:hover:text-greenHoverLight"
	);
	likeButton.ariaLabel = "Like this post";
	// Create like icon
	const likeIcon = document.createElement("i");
	likeIcon.classList.add("fa-regular", "fa-heart");
	likeButton.append(likeIcon);
	// Create like count
	const likeCount = document.createElement("span");
	likeCount.classList.add("ms-1");
	likeCount.textContent = postData._count.reactions;
	likeButton.append(likeCount);
	footer.append(likeButton);

	// Create comment button
	const commentButton = document.createElement("button");
	commentButton.classList.add(
		"flex",
		"items-center",
		"text-gray-400",
		"hover:text-greenPrimary",
		"dark:hover:text-greenHoverLight"
	);
	commentButton.ariaLabel = "Comment on this post";
	// Create comment icon
	const commentIcon = document.createElement("i");
	commentIcon.classList.add("fa-regular", "fa-comment");
	commentButton.append(commentIcon);
	// Create comment count
	const commentCount = document.createElement("span");
	commentCount.classList.add("ms-1");
	commentCount.textContent = postData._count.comments;
	commentButton.append(commentCount);
	footer.append(commentButton);

	post.append(footer);

	return post;
}

export function renderPostTemplate(postData, parent) {
	parent.append(postTemplate(postData));
}
