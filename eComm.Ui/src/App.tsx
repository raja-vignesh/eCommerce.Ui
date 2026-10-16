import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./ui/AppLayout";
import { Orders } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QUERY_STALE_TIME } from "./constants/queryContants";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME.ONE_MINUTE,
      retry: 1,
      refetchOnWindowFocus: true,
      retryDelay: 10 * 1000,
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
        element: <Products />,
      },
      {
        path: "dashboard",
        element: <Products />,
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
      <UserProvider>
        <RouterProvider router={browserRouter} />
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: { duration: 2000 },
            error: { duration: 4000 },
          }}
        />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
