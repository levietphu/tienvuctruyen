import { configureStore, combineReducers } from "@reduxjs/toolkit";
import story from "../pages/cms/story/slice/storySlice";
import storyPage from "../pages/web/story/slice/storyPageSlice";

const rootReducer = combineReducers({
  story,
  storyPage,
});

export const rootStore = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
