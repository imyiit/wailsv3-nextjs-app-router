import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

interface Navbar {
  isOpen: boolean;
}

const initialState: Navbar = {
  isOpen: false,
};

export const NavbarSlice = createSlice({
  name: "Navbar",
  initialState,
  reducers: {
    setNavbar: (state, action: PayloadAction<Navbar["isOpen"]>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setNavbar } = NavbarSlice.actions;

export const selectNavbar = (state: RootState) => state.Navbar.isOpen;

export default NavbarSlice.reducer;
