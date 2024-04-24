import { getPosts } from "../api/posts/read.mjs";
import * as templates from "../templates/index.mjs";

const errContainer = document.querySelector(`#loadErrorContainer`);

export function loadMorePosts() {
	let currentPage = 1;
	const postsLimit = 100;

	const loadMoreButton = document.querySelector("#loadMoreBtn");
	const postsContainer = document.querySelector("#feed");

	loadMoreButton.addEventListener("click", async () => {
		currentPage++;

		const posts = await getPosts(postsLimit, currentPage);

		// Handle request response
		if (!posts.data || !posts.data.length) {
			// Handle error
			errContainer.classList.remove("hidden");
			errContainer.classList.add("flex");
			errContainer.textContent = "Could not load more posts.";
		} else {
			// Handle success
			// Render posts
			posts.data.forEach((postData) => {
				templates.renderPostTemplate(postData, postsContainer);
			});

			// Remove error, if any
			if (!errContainer.classList.contains("hidden")) {
				errContainer.classList.add("hidden");
				errContainer.classList.remove("flex");
			}
		}

		// Check if there are more posts to load
		if (posts.meta.isLastPage) {
			loadMoreButton.remove();
		}
	});
}
