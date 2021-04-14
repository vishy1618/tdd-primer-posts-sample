import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Post } from './post';
import { PostCard } from './post-card';
import { PostsList } from './posts-list';
import { PostsLoader } from './posts-loader';
import { getPosts } from './posts-service';

jest.mock("./posts-service");

const post: Post = {
  id: 1,
  title: 'My post',
  body: 'post',
  userId: 'userId',
};

const actImmediate = (wrapper: any) =>
  act(
    () =>
      new Promise<void>((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      })
  );

describe("PostsList", () => {
  it("fetches posts on render", async () => {
    mount(<PostsList />);

    expect(getPosts).toBeCalled();
  });

  it('shows loading when posts is not yet returned', async () => {
    const wrapper = mount(<PostsList />);

    expect(wrapper.find(PostsLoader)).toHaveLength(1);
  });

  it('shows posts when posts are fetched', async () => {
    (getPosts as any).mockImplementation(() => Promise.resolve([post]));

    const wrapper = mount(<PostsList />);

    await actImmediate(wrapper);

    expect(wrapper.find(PostCard)).toHaveLength(1);
  });
});
