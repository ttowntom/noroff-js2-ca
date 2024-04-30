import { getPostsFromFollowing } from "../api/posts/postsFromFollowing.mjs";
import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplate } from "../templates/post.mjs";

const timelineLi = document.querySelector("#navTimelineLi");
const btnTimeline = document.querySelector("#navTimeline");
const followingLi = document.querySelector("#navFollowingLi");
const btnFollowing = document.querySelector("#navFollowing");
const feed = document.querySelector("#feed");

export function feedNavTimeline() {
	btnTimeline.addEventListener("click", () => {
		// Clear feed
		feed.innerHTML = "";

		// Render posts
		getPosts().then((posts) => {
			posts.data.forEach((postData) => {
				renderPostTemplate(postData, feed);
			});
		});

		// Set active class
		timelineLi.classList.add("border-b-4", "border-greenPrimary");
		timelineLi.classList.remove(
			"hover:border-greenHover",
			"dark:hover:border-greenHoverLight"
		);
		followingLi.classList.remove("border-b-4", "border-greenPrimary");
		followingLi.classList.add(
			"hover:border-b-4",
			"hover:border-greenHover",
			"dark:hover:border-greenHoverLight"
		);
		btnFollowing.classList.remove();
		btnFollowing.classList.add(
			"hover:text-greenHover",
			"dark:hover:text-greenHoverLight"
		);
		btnTimeline.classList.add();
		btnTimeline.classList.remove(
			"hover:text-greenHover",
			"dark:hover:text-greenHoverLight"
		);
	});
}

export async function feedNavFollowing() {
	const postsFromFollowing = await getPostsFromFollowing();

	btnFollowing.addEventListener("click", () => {
		// Clear feed
		feed.innerHTML = "";

		// Render posts
		postsFromFollowing.data.forEach((postData) => {
			renderPostTemplate(postData, feed);
		});

		// Set active class
		followingLi.classList.add("border-b-4", "border-greenPrimary");
		followingLi.classList.remove(
			"hover:border-greenHover",
			"dark:hover:border-greenHoverLight"
		);
		timelineLi.classList.remove("border-b-4", "border-greenPrimary");
		timelineLi.classList.add(
			"hover:border-b-4",
			"hover:border-greenHover",
			"dark:hover:border-greenHoverLight"
		);
		btnTimeline.classList.remove();
		btnTimeline.classList.add(
			"hover:text-greenHover",
			"dark:hover:text-greenHoverLight"
		);
		btnFollowing.classList.add();
		btnFollowing.classList.remove(
			"hover:text-greenHover",
			"dark:hover:text-greenHoverLight"
		);
	});
}
