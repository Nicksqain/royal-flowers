import { fetchAuthMe, logout as apiLogout  } from '@/api/auth';
import { User } from '@/api/auth/types';
import { AppDispatch } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;

// Async thunk for checking auth
export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetchAuthMe();
    dispatch(setUser(response));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setError(error.response?.data || 'Authorization required'));
    } else {
      dispatch(setError('Authorization required'));
    }
  }
};

// Async thunk for logging out
export const logoutUser  = () => async (dispatch: AppDispatch) => {
  try {
    await apiLogout();
    dispatch(logout());
  } catch (error) {
    console.error('Logout failed:', error);
  }
};