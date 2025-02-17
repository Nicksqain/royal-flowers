import { lazy, Suspense } from 'react'

import { createBrowserRouter, Outlet, RouterProvider, useLocation, useMatches } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header/Header';
import Orders from './pages/Orders';

const AuthPage = lazy(() => import('@/pages/Auth'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));
const ErrorBoundary = lazy(() => import('@/pages/ErrorBoundary'));

const MainLayout: React.FC = () => (
  <Box>
    <Header />
    <Container>
      <Outlet />
    </Container>
    {/* <Footer>Footer</Footer> */}
  </Box>
);

const SimpleLayout: React.FC = () => (
  <Box>
    <Container>
      <Outlet />
    </Container>
    {/* <Box>Footer</Box> */}
  </Box>
);

const LayoutWrapper: React.FC = () => {
  const location = useLocation();
  const noLayoutPaths = ['/auth'];
  const matches = useMatches();

  const isPageNotFound = matches.some(match => match.params['*']);
  if (isPageNotFound || noLayoutPaths.includes(location.pathname)) {
    return <SimpleLayout />;
  }

  return <MainLayout />;
};

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutWrapper />,
      children: [
        {
          path: "/",
          element: <Suspense fallback={<div>Loading...</div>}>
            <>Home</>
          </Suspense>,
        },
        {
          path: "/auth",
          element: <Suspense fallback={<div>Loading...</div>}>
            <AuthPage />
          </Suspense>,
        },
        {
          path: "/orders",
          element: (
            <PrivateRoute disabled={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "*", element:
            <Suspense fallback={<div>Loading...</div>}>
              <PageNotFound />
            </Suspense>
        },
      ],
      errorElement: <Suspense fallback={<div>Loading...</div>}><ErrorBoundary /></Suspense>,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
