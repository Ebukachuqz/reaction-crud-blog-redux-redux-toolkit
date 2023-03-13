import ReactionButtons from "features/post/components/ReactionButtons";
import TimeAgo from "features/post/components/TimeAgo";
import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

const PostExcerpt = ({ postId }: any) => {
  const post = useSelector((state) => selectPostById(state, postId))!;
  return (
    <article>
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      <h2>{post.title}</h2>
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        <Link to={`post/${post.id}`}>View Post</Link>
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        <PostAuthor userId={post.userId} />
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        <TimeAgo timestamp={post.date} />
      </p>
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      <ReactionButtons reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostExcerpt;
