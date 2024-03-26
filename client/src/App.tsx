// Styles
import "./App.css";
// External imports
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Custom hooks
import useNetworkStatus from "hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "hooks/useStoreTypes";
import useWindowSize from "hooks/useWindowSize";
// Utils
import { axiosInstance } from "utils/axiosInstance";
// Components
import { Transition } from "components/Loading/Loading";
import ErrorBoundary from "components/Error/ErrorBoundary";
import Alert from "components/Alerts/Alert";
import NoInternetAlert from "components/Alerts/NoInternetAlert";

// Pages
const Home: any = lazy(() => import("./pages/Home/Home"));
const Products: any = lazy(() => import("./pages/Products/Products"));
const Product: any = lazy(() => import("./pages/SingleProduct/SingleProduct"));
const Auth: any = lazy(() => import("./pages/Auth/Auth"));
const LoginSuccess: any = lazy(() => import("./pages/LoginSuccess"));
const Cart: any = lazy(() => import("./pages/Cart/Cart"));
const User: any = lazy(() => import("./pages/User/User"));
const ProductForm: any = lazy(() => import("./pages/ProductForm/ProductForm"));

function App() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  useWindowSize();
  useEffect(() => {
    const getCredentials = async () => {
      try {
        const res = await axiosInstance.get("/api/user/info");
        dispatch({ type: "IS_ADMIN", payload: res.data.isAdmin });
        !auth.isLogged && dispatch({ type: "IS_LOGGED", payload: true });
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("firstLogin");
        }
      }
    };
    if (!auth.isLogged && localStorage.getItem("firstLogin")) getCredentials();
  }, [auth.isLogged]);

  return (
    <BrowserRouter>
      <Alert />

      {!isOnline && <NoInternetAlert />}
      <ErrorBoundary>
        <Suspense fallback={<Transition />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/login"
              element={auth.isLogged ? <Navigate replace to="/" /> : <Auth />}
            />
            <Route
              path="/register"
              element={auth.isLogged ? <Navigate replace to="/" /> : <Auth />}
            />
            <Route
              path="/login-success"
              element={
                auth.isLogged ? <Navigate replace to="/" /> : <LoginSuccess />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route
              path="/add"
              element={
                !auth.isAdmin ? <Navigate replace to="/" /> : <ProductForm />
              }
            />
            <Route
              path="/edit/:id"
              element={
                !auth.isAdmin ? <Navigate replace to="/" /> : <ProductForm />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
