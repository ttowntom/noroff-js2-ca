# JS2, Social Media Website - WhispR

![image](https://i.postimg.cc/63L7tZtK/Feed-Whisp-R.png)

A Noroff assignment to create a "front-end client for an existing social media platform".

## Description

This is a front-end client for a social media platform called WhispR. The website is built using the Tailwind CSS framework and pure Javascript. It is a part of the Noroff course to learn about Javascript.

The full assignment description can be found [here](https://content.noroff.dev/javascript-2/ca.html).

## Features

- Register a new user (if they pass email criteria)
- Login
- Logout
- View all posts
- View a single post
- View all posts from following
- Search for posts
- Filter posts by media/no media/all
- View a user profile
- Edit user profile
- Create a new post
- Edit a post
- Delete a post
- Like a post
- Comment on a post
- Delete a comment
- Follow/Unfollow a user
- Light/Dark mode

### Known Issues

- The backend serves the wrong data from the "posts from following" endpoint.
- The backend does not allow removing media URL from a post that has one.
- The backend does not serve "reactors" for "all posts" endpoint, which results in the heart icon not being filled in for liked posts on the main feed / user feed (single post works).

## Built With

The page is built with the following technologies:

- [HTML5](https://html.com/html5/)
- [Tailwind](https://tailwindcss.com/)
- [Javascript](https://www.javascript.com/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:ttowntom/noroff-js2-ca.git
```

2. Install the dependencies:

```bash
npm install
```

### Running

To run the app in dev mode, run the following commands:

```bash
npm run dev
```
