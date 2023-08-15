import { createSlice } from '@reduxjs/toolkit';
import { token } from 'morgan';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

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
    setPosts:(state,action)=>{
        state.token = action.payload.token;

    }
  },
});
