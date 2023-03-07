import ReactionButtons from "components/ReactionButtons";
import TimeAgo from "components/TimeAgo";
import React from "react";
import PostAuthor from "./PostAuthor";

const PostExerpt = ({ post }) => {
  console.log(post);
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostExerpt;
