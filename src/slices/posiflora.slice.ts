import { fetchPosifloraStores } from '@/api/posiflora';
import { PosifloraStore } from '@/api/posiflora/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронная функция для получения точек продаж с сервера
export const fetchStores = createAsyncThunk('amocrm/fetchStores', async () => {
  const response = await fetchPosifloraStores();
  return response;
});

interface PosifloraState {
  activeStore: PosifloraStore | null;
  stores: PosifloraStore[];
  loading: boolean;
  error: string | null;
}

const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('activeStore');
  return savedState ? JSON.parse(savedState) : null;

};
const initialState: PosifloraState = {
  activeStore: loadStateFromLocalStorage(),
  stores: [],
  loading: false,
  error: null,
};

const posifloraSlice = createSlice({
  name: 'posiflora',
  initialState,
  reducers: {
    setActiveStore(state, action) {
      state.activeStore = action.payload;
      localStorage.setItem('activeStore', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setActiveStore } = posifloraSlice.actions;
export default posifloraSlice.reducer;