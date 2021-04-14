import {
  useEffect,
  useState,
} from 'react';

import { Post } from './post';
import { PostCommentBadge } from './post-comment-badge';
import { getPostComments } from './posts-service';

export function PostCard({ data }: { data: Post }) {
  const [commentCount, setCommentCount] = useState(undefined as (number | undefined));
  useEffect(() => {
    async function fetchCommentCount() {
      const comments = await getPostComments(data.id);
      console.log(comments, data.id);
      setCommentCount(comments.length);
    }
    fetchCommentCount();
  }, []);

  return (
    <div className="card m-5">
      <div className="card-body">
        <h2 className="card-title">
          {data.title}
        </h2>
        {
          commentCount && <PostCommentBadge count={commentCount} />
        }
        <p className="card-text">{data.body}</p>
      </div>
    </div>
  );
}
