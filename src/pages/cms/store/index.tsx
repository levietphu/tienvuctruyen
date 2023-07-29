import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cate from "./cate/cateSlice";
// ...

const rootReducer = combineReducers({
  cate,
});

export const rootStore = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
