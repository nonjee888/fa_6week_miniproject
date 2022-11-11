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

      return data.data.data;
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
        payload.data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );

      return thunkApI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);
export const onLikePost = createAsyncThunk(
  "like/onLikePost",
  async (payload, thunkApI) => {
    console.log(payload);
    try {
      const data = await instance.post(
        `/api/auth/posts/likes/${payload}`,
        {} //post는 두번째 인자가 데이터가 들어가야해서 {}를 넣어줌 데이터가 없으면 headers를 데이터로 인식
      );
      return payload;
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);
export const removePost = createAsyncThunk(
  "remove/removePost",
  async (payload, thunkApI) => {
    try {
      const data = await instance.delete(`/api/auth/posts/${payload.id}`);
      console.log(data);
      return thunkApI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkApI.rejectWithValue(error);
    }
  }
);
export const posts = createSlice({
  name: "post",
  initialState: {
    posts: [],
    detail: {
      id: 0,
      nickname: "",
      title: "",
      content: "",
      imgUrl: "",
      likes: 0,
      commentResponseDtoList: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(__getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(__getDetailPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDetailPosts.fulfilled, (state, action) => {
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
        state.detail = { ...state.detail, likes: state.detail.likes };
        console.log(state.detail);
      })
      .addCase(onLikePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(removePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(state.detail);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default posts;
