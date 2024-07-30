import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_KEY = process.env.REACT_APP_RAPIDAPIKEY;
const API_HOST = 'auth100.p.rapidapi.com';
const API_BASE_URL = 'https://auth100.p.rapidapi.com/cerve/api/v1.0';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, ownerUuid, password, rol }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users`,
        { email, ownerUuid, password, rol },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'country-code': 'AR',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('User registration failed:', error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, ownerUuid }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password, ownerUuid },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'country-code': 'AR',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {

      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'country-code': 'AR',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const getUser = createAsyncThunk(
  'auth/getUser',
  async ({ ownerUuid }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
            'country-code': 'AR',
          },
          params: { owner: ownerUuid },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Get user failed:', error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
