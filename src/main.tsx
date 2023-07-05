import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './contexts/UserProvider.tsx'
import 'react-toastify/dist/ReactToastify.css';
import { FetchProvider } from './contexts/fetchProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <ToastContainer />
          <FetchProvider>
            <App />
          </FetchProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
