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
    // @ts-expect-error TS(2749): 'Routes' refers to a value, but is being used as a... Remove this comment to see the full error message
    <Routes>
      // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
      <Route path="/" element={<Layout />}>
        // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
        <Route index element={<PostsList />} />

        // @ts-expect-error TS(2304): Cannot find name 'path'.
        <Route path="post">
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route index element={<AddPostForm />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path=":postId" element={<SinglePostPage />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        // @ts-expect-error TS(2304): Cannot find name 'path'.
        <Route path="user">
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route index element={<UsersList />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
