import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (page) => {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=100`);
    if (!response.ok) throw new Error('Failed to fetch images');
    return await response.json();
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    page: 1,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(...action.payload);
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementPage } = imagesSlice.actions;
export default imagesSlice.reducer;
