import React from 'react';
import './styles/App.scss';

import useSaveCartAndGoodsInLocalStorage from './hooks/useSaveCartInLocalStorage';
import AppRouter from './components/AppRouter';

function App() {
  useSaveCartAndGoodsInLocalStorage();

  return <AppRouter />;
}

export default App;
