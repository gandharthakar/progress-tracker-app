// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import WebRoutes from '@/web-routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StyledEngineProvider } from '@mui/material/styles';
import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <StyledEngineProvider>
      <RouterProvider router={WebRoutes} />
    </StyledEngineProvider>
  </QueryClientProvider>,
  // </StrictMode>,
)
