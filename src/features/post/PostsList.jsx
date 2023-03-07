import ReactionButtons from "components/ReactionButtons";
import TimeAgo from "components/TimeAgo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import PostExerpt from "./PostExerpt";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from "./postSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostExerpt key={post.id} post={post} />
    ));
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
