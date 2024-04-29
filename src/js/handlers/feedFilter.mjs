import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplate } from "../templates/post.mjs";

export async function feedFilter() {
	const feedContainer = document.querySelector("#filter");
	const feed = document.querySelector(`#feed`);
	const loadMoreButton = document.querySelector("#loadMoreBtn");

	// Filter the feed based on the selected option
	feedContainer.addEventListener("change", async () => {
		const allPosts = await getPosts();
		let posts;
		const selectedOption =
			feedContainer.options[feedContainer.selectedIndex].value;

		// Clear the feed
		feed.innerHTML = "";

		// Remove the load more button
		loadMoreButton.classList.add("hidden");

		// Handle selection
		if (selectedOption === "media") {
			// Get posts with media
			posts = allPosts.data.filter((post) => post.media && post.media.url);
		} else if (selectedOption === "noMedia") {
			posts = allPosts.data.filter((post) => !post.media || !post.media.url);
		} else {
			// Get all posts
			posts = allPosts.data;
			// Show the load more button
			loadMoreButton.classList.remove("hidden");
		}

		// Render the posts
		posts.forEach((postData) => {
			renderPostTemplate(postData, feed);
		});
	});
}
