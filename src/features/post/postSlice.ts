import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import { apiSlice } from "features/api/apiSlice";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postAdapter = createEntityAdapter({
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      transformResponse: (res) => {
        let minute = 1;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        const posts = res.map((post: any) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: minute++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postAdapter.setAll(initialState, posts);
      },
      // @ts-expect-error TS(2322): Type '(result: EntityState<unknown> | undefined, e... Remove this comment to see the full error message
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts?userId=${id}`,
      transformResponse: (response) => {
        let minute = 1;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        const posts = response.map((post: any) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: minute++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postAdapter.setAll(initialState, posts);
      },
    }),
    addNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...post,
          userId: Number(post.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: {
          ...post,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    reactionCount: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        body: { postId, reaction },
      }),

      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const updateAction = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getAllPosts",
            undefined,
            (draft) => {
              const post = draft.entities[postId];
              if (post) post.reactions[reaction]++;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          updateAction.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByUserIdQuery,
  useDeletePostMutation,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useReactionCountMutation,
} = extendedApiSlice;

// Returns the result object of the getAllPosts query
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
const selectGetAllPostsResult = extendedApiSlice.endpoints.getAllPosts.select();

// memoized selector for all posts data
const selectAllPostsData = createSelector(
  selectGetAllPostsResult,
  (getAllPostsResult) => getAllPostsResult.data // Normalized state
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postAdapter.getSelectors(
  // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
  (state) => selectAllPostsData(state) ?? initialState
);
