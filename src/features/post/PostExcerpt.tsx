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
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default PostExcerpt;
