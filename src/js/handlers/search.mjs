import { getSearchRes } from "../api/posts/search.mjs";
import * as templates from "../templates/index.mjs";
import { searchRemove } from "./searchRemove.mjs";

const feedContainer = document.querySelector("#feed");
const loadMoreButton = document.querySelector("#loadMoreBtn");
const loadErrorContainer = document.querySelector("#loadErrorContainer");

export function setSearchFormListener() {
	const form = document.querySelector("#searchForm");

	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const form = e.target;
			const formData = new FormData(form);
			const search = Object.fromEntries(formData.entries());
			const filter = document.querySelector(`#filter`);

			try {
				let isLastPage = true;

				// Handle search
				async function renderPosts() {
					feedContainer.innerHTML = "";

					const posts = await getSearchRes(search.searchTerm);

					// Handle request response
					if (!posts.data || !posts.data.length) {
						// Handle no posts found
						loadErrorContainer.classList.remove("hidden");
						loadErrorContainer.classList.add("flex");
						loadErrorContainer.textContent =
							"No posts found matching the search term.";
					} else {
						// Render posts
						posts.data.forEach((postData) => {
							templates.renderPostTemplate(postData, feedContainer);
						});

						// Remove filter
						if (filter) {
							filter.remove();
						}

						// Remove error, if any
						if (!loadErrorContainer.classList.contains("hidden")) {
							loadErrorContainer.classList.add("hidden");
							loadErrorContainer.classList.remove("flex");
						}
					}

					// Set isLastPage
					isLastPage = posts.meta.isLastPage;
				}
				renderPosts();

				searchRemove();

				// Handle pagination
				if (isLastPage) {
					loadMoreButton.remove();
				} else {
					// Handle load more
				}
			} catch (error) {
				// Handle error
				throw new Error("Error getting posts: " + error.message);
			}
		});
	}
}
