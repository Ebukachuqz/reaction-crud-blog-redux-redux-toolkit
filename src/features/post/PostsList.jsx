import React from "react";
import { useSelector } from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {
  selectPostsError,
  selectPostsIds,
  selectPostsStatus,
} from "./postSlice";

const PostsList = () => {
  const orderedPosts = useSelector(selectPostsIds);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPosts.map((id) => <PostExcerpt key={id} postId={id} />);
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
