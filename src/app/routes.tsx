import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../App'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const AgreementForm = lazy(() => import('../pages/AgreementForm'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Define routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'chat/:id?',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ChatPage />
          </Suspense>
        ),
      },
      {
        path: 'agreement/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AgreementForm />
          </Suspense>
        ),
      },
      {
        path: 'payment/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
