import { createSlice } from '@reduxjs/toolkit';

// SETTING THE INITALSTATE
const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

// CREATING THE ACTIONS AND ROOT_REDUSERS
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error('The User friends non-existent :(');
      }
    },
    setPosts: (state, action) => {
      state.token = action.payload.posts ;
    },
    setPost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatePost;
    },
  },
});

//SETING THE REDUCER

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
