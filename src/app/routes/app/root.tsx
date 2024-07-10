import Layout from '@/components/Layout';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
Layout;
// import { Spinner } from '@/components/ui/spinner';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <Layout>
      <Suspense fallback={<div>NowLoading ...</div>}>
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
};
