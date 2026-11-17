import { configureStore } from "@reduxjs/toolkit";

import Loading from "./loading/loadingSlice";
import Navbar from "./navbar/navbarSlice";
import Theme from "./theme/themeSlice";

export * from "./loading";
export * from "./navbar";
export * from "./theme";

export const configureStores = configureStore({
  reducer: { Loading, Navbar, Theme },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
