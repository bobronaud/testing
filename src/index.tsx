import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
);
reportWebVitals();
