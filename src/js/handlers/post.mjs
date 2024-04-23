import { createPost } from "../api/posts/create.mjs";

export function setPostFormListener() {
	const form = document.querySelector("#postForm");
	const user = JSON.parse(localStorage.getItem("profile"));

	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const form = e.target;
			const formData = new FormData(form);
			// const post = Object.fromEntries(formData.entries());
			const postData = {
				title: `${user.name} whispered`,
				body: formData.get("body"),
			};

			// Send to API
			createPost(postData);
		});
	}
}
