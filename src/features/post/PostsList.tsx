import React from "react";
import { useSelector } from "react-redux";
import PostExcerpt from "./PostExcerpt";
import { selectPostsIds, useGetAllPostsQuery } from "./postSlice";

const PostsList = () => {
  // @ts-expect-error TS(2554): Expected 1-2 arguments, but got 0.
  const { isError, isLoading, isSuccess, error } = useGetAllPostsQuery();
  const orderedPosts = useSelector(selectPostsIds);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedPosts.map((id) => <PostExcerpt key={id} postId={id} />);
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
