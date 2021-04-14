export function PostCommentBadge({ count }: { count: number }) {
  return (
    <span className="badge bg-secondary text-light">{count} comments</span>
  );
}
