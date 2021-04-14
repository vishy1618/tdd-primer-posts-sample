import React from 'react';

import { Post } from './post';
import { PostCard } from './post-card';
import { PostsLoader } from './posts-loader';
import { getPosts } from './posts-service';

type MyProps = {};

type MyState = {
  posts?: Post[]
};

export class PostsList extends React.Component<MyProps, MyState> {
  state: MyState = {
    posts: undefined,
  };

  async componentDidMount() {
    this.getPosts();
  }

  private async getPosts() {
    const postsResponse = await getPosts();
    this.setState({ posts: postsResponse });
  }

  render() {
    const posts = this.state.posts;

    return (
      <div className="container">
        {
          posts ? (
            posts.map((post) => <PostCard key={post.id} data={post} />)
          ) : <PostsLoader />
        }
      </div>
    );
  }
}
