import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactionButtons from "../components/ReactionButtons";
import TimeAgo from "../components/TimeAgo";
import PostAuthor from "../PostAuthor";
import { selectPostById } from "../postSlice";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      <h2>{post.title}</h2>
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      <p>{post.body}</p>
      <p className="postCredit">
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
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

export default SinglePostPage;
