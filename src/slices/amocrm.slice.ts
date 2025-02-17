import { fetchAmoCrmPipelines } from '@/api/amocrm';
import { AmoCrmPipeline } from '@/api/amocrm/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронная функция для получения воронок с сервера
export const fetchPipelines = createAsyncThunk('amocrm/fetchPipelines', async () => {
  const response = await fetchAmoCrmPipelines();
  return response;
});

interface AmocrmState {
  activePipeline: AmoCrmPipeline | null;
  pipelines: AmoCrmPipeline[];
  loading: boolean;
  error: string | null;
}

const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('activePipeline');
  return savedState ? JSON.parse(savedState) : null;

};
const initialState: AmocrmState = {
  activePipeline: loadStateFromLocalStorage(),
  pipelines: [],
  loading: false,
  error: null,
};

const amocrmSlice = createSlice({
  name: 'amocrm',
  initialState,
  reducers: {
    setActivePipeline(state, action) {
      state.activePipeline = action.payload;
      localStorage.setItem('activePipeline', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPipelines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPipelines.fulfilled, (state, action) => {
        state.loading = false;
        state.pipelines = action.payload;
      })
      .addCase(fetchPipelines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

// Экспортируем действия и редюсер
export const { setActivePipeline } = amocrmSlice.actions;
export default amocrmSlice.reducer;