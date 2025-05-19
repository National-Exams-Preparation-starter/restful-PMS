import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth/AuthProvider';
import PagesRoutes from './routes';

const client = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={client}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='top-right'/>
        <PagesRoutes/>
      </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
