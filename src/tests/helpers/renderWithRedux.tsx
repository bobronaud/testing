import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../../store/slices/testSlice';
import { RootState } from '../../store/store';

const renderWithRedux = (component: JSX.Element, preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: {
      test: testReducer,
    },
    preloadedState,
  });
  return render(<Provider store={store}>{component}</Provider>);
};

export default renderWithRedux;
