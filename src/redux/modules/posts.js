import { instance } from "../../shared/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/posts");

      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailPosts = createAsyncThunk(
  "detailPosts/getDetailPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/api/posts/${payload}`);
      // console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/upDate",
  async (payload, thunkApI) => {
    console.log(payload);
    try {
      const data = await instance.put(
        `/api/auth/posts/${payload.id}`,
        payload.id,
        {
          headers: {
            "Content-Type": "multipart/form",
          },
        }
      );
      console.log(payload);
      return thunkApI.fulfillWithValue(data.data);
      console.log(data);
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);

export const onLikePost = createAsyncThunk(
  "post/upDate",
  async (payload, thunkApI) => {
    console.log(payload);
    try {
      const data = await instance.post(
        `/api/auth/posts/like/${payload.add1.data.id}`,
        {} //post는 두번째 인자가 데이터가 들어가야해서 {}를 넣어줌 데이터가 없으면 headers를 데이터로 인식
      );
      return thunkApI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);

// export const updatePost = createAsyncThunk(
//   "post/upDate",
//   async (payload, thunkApI) => {
//     console.log(payload);
//     try {
//       const data = await axios.put(
//         `http://54.180.31.216/api/auth/post/${payload.id}`,
//         payload.id,
//         {
//           headers: {
//             "Content-Type": "multipart/form",
//             Authorization: payload.token,
//             RefreshToken: payload.fresh,
//           },
//         }
//       );
//       console.log(payload);
//       return thunkApI.fulfillWithValue(data.data);
//       console.log(data);
//     } catch (error) {
//       return thunkApI.rejectWithValue(error);
//     }
//   }
// );

//http://52.79.247.187:8080/api/posts"

export const posts = createSlice({
  name: "post",
  initialState: {
    posts: [],
    detail: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    createPost(state, action) {
      state.posts.push(action.payload);
      instance.post("/api/auth/posts", action.payload);
    },
    removePost(state, action) {
      console.log(state, action);
      let index = state.posts.findIndex((post) => post.id === action.payload);

      state.posts.splice(index, 1);
      instance.delete(`/api/auth/posts/${action.payload.id}`);
    },
    // updatePost(state, action) {
    //   let index = state.posts.findIndex(
    //     (post) => post.id === action.payload.id
    //   );
    //   state.posts.splice(index, 1, action.payload);
    //   console.log(action.payload);
    //   axios.put(
    //     `http://52.79.247.187:8080/api/auth/posts/${action.payload.id}`,
    //     action.payload,
    //     {
    //       headers: {
    //         Authorization: action.payload.token,
    //         RefreshToken: action.payload.fresh,
    //       },
    //     }
    //   );
    // },
  },
  extraReducers: (builder) => {
    // console.log(builder);
    builder
      .addCase(__getPosts.pending, (state) => {
        state.isLoading = true;
        // console.log("pending");
      })
      .addCase(__getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        // console.log(action.payload);
      })
      .addCase(__getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log("rejected");
      });

    builder
      .addCase(__getDetailPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDetailPosts.fulfilled, (state, action) => {
        // console.log(__getDetailPosts);
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(__getDetailPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(onLikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(onLikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(state.detail);
      })
      .addCase(onLikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export let { createPost, removePost } = posts.actions;

export default posts;
