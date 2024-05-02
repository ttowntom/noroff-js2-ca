import { getPostsFromFollowing } from "../api/posts/postsFromFollowing.mjs";
import { getPosts } from "../api/posts/read.mjs";
import { feedNavClasses } from "../helpers/feedNavClasses.mjs";
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

		// Change classes
		feedNavClasses(timelineLi, btnTimeline, followingLi, btnFollowing);
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

		// Change classes
		feedNavClasses(followingLi, btnFollowing, timelineLi, btnTimeline);
	});
}
