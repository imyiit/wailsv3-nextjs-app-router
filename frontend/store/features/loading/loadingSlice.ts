import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface Loading {
  isLoading: boolean;
}

const initialState: Loading = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Loading["isLoading"]>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.Loading.isLoading;

export default loadingSlice.reducer;
