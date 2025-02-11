import { lazy, Suspense } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AuthPage = lazy(() => import('@/pages/Auth'));

function App() {
  const router = createBrowserRouter([
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
      path: "*", element:
        <Suspense fallback={<div>Loading...</div>}>
          <AuthPage />
        </Suspense>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
