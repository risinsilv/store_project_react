import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App/App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate to manage rehydration
import { store, persistor } from './redux/store.js'; // Import the store and persistor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
