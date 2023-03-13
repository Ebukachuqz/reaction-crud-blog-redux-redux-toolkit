import {
  selectAllPosts,
  useGetPostsByUserIdQuery,
} from "features/post/postSlice";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(Number(userId));

  let postTitles;
  if (isLoading) {
    postTitles = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    postTitles = ids.map((id) => (
      <li key={id}>
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        <Link to={`/post/${id}`}>{entities[id]?.title}</Link>
      </li>
    ));
  } else if (isError) {
    postTitles = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
