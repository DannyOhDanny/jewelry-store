import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CatalogPage from './pages/CatalogPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CatalogPage />
    </QueryClientProvider>
  );
};

export default App;
