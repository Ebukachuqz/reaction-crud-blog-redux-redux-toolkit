import AddPostForm from "./features/post/AddPostForm";
import PostsList from "./features/post/PostsList";
import { Routes, Route } from "react-router-dom";
import SinglePostPage from "features/post/pages/SinglePostPage";
import Layout from "components/Layout";
import EditPostForm from "features/post/pages/EditPostForm";

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
      </Route>
    </Routes>
  );
}

export default App;
