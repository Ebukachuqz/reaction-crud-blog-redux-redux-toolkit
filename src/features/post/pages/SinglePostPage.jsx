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
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons reactions={post.reactions} postId={post.id} />
    </article>
  );
};

export default SinglePostPage;
