import { selectAllUsers } from "features/users/usersSlice";
import { useSelector } from "react-redux";

const PostAuthor = ({
  userId
}: any) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user: any) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
