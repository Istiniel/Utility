import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, render } from '@testing-library/react';
import { RootState, AppStore } from '../redux/store';
import AppRouter from '../components/AppRouter';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { animeAPI } from '../redux/API/animeAPI';
import animeReducer from '../redux/features/anime/anime';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderTestWithStore = (
  component: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        anime: animeReducer,
        [animeAPI.reducerPath]: animeAPI.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeAPI.middleware),
      preloadedState,
    }),
    ...RenderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return { store, ...render(component, { wrapper: Wrapper, ...RenderOptions }) };
};
