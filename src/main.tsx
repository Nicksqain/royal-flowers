import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { setupStore } from './store/index.ts';
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={setupStore()}>
    <Provider forcedTheme='light'>
      <Toaster />
      <App />
    </Provider>
  </ReduxProvider>,
)
