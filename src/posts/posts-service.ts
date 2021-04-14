import fetch from 'cross-fetch';

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const POST_COMMENTS_URL = "/comments";

export async function getPosts() {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error(`Received: ${response.status}`);
  }

  return response.json();
}

export async function getPostComments(postId: number) {
  const response = await fetch(`${POSTS_URL}/${postId}${POST_COMMENTS_URL}`);

  if (!response.ok) {
    throw new Error(`Received: ${response.status}`);
  }

  return response.json();
}
