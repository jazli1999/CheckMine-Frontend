import { holidayApi } from './queryService';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [holidayApi.reducerPath]: holidayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(holidayApi.middleware),
});

setupListeners(store.dispatch);
