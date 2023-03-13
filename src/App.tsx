import AddPostForm from "./features/post/AddPostForm";
import PostsList from "./features/post/PostsList";
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "features/post/pages/SinglePostPage";
import Layout from "components/Layout";
import EditPostForm from "features/post/pages/EditPostForm";
import UsersList from "features/users/UserList";
import UserPage from "features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
