import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};

export default ErrorBoundary;