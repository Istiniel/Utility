import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, render } from '@testing-library/react';
import { RootState, AppStore } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../components/AppRouter';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import goodsListReducer from '../redux/features/goodsList/goodsSlice';
import cartReducer from '../redux/features/cart/cartSlice';
import { Context as ResponsiveContext } from 'react-responsive';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialRoute?: string;
  preloadedState?: PreloadedState<RootState>;
  windowWidth?: number;
  store?: AppStore;
}

export const renderTestApp = (
  component: React.ReactElement,
  {
    initialRoute = '/',
    preloadedState = {},
    windowWidth = 768,
    store = configureStore({
      reducer: { goodsList: goodsListReducer, cart: cartReducer },
      preloadedState,
    }),
    ...RenderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <ResponsiveContext.Provider value={{ width: windowWidth }}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialRoute]}>
            <AppRouter />
            {children}
          </MemoryRouter>
        </Provider>
      </ResponsiveContext.Provider>
    );
  }

  return { store, ...render(component, { wrapper: Wrapper, ...RenderOptions }) };
};
