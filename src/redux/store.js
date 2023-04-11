import { configureStore, createSlice } from "@reduxjs/toolkit";
import initialState from './initialState';

// const initialState = {
//   data: [],
//   loading: false,
//   error: null,
// };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  dataSlice.actions;

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const selectData = (state) => state.data;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
