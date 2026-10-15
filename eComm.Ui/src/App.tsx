import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./ui/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QUERY_STALE_TIME } from "./constants/queryContants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME.ONE_MINUTE,
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 4000 },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
