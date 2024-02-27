import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { cartTotal } from "./features/shopSlice";
import { useAppDispatch } from "./app/hooks";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  const { cartItems } = useAppSelector((state) => state.shop);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartItems, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
