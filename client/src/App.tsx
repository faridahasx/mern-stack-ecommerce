// Styles
import "./App.css";
// External imports
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Custom hooks
import useNetworkStatus from "./hooks/useNetworkStatus";
import { useAppSelector } from "./hooks/useStoreTypes";
import useWindowSize from "./hooks/useWindowSize";
// Components
import { PageLoading } from "./components/loading/Loading";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Alert from "./components/alerts/Alert";
import NoInternetAlert from "./components/alerts/NoInternetAlert";
import useGetUserCredentials from "./hooks/useGetUserCredentials";

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
  const isOnline = useNetworkStatus();
  const getUserCredentials = useGetUserCredentials();
  useWindowSize();

  useEffect(() => {
    if (auth.isLogged === null) getUserCredentials();
  }, [auth.isLogged]);

  return (
    <BrowserRouter>
      <Alert />
      {!isOnline && <NoInternetAlert />}
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/login"
              element={
                auth.isLogged === true ? <Navigate replace to="/" /> : <Auth />
              }
            />
            <Route
              path="/register"
              element={
                auth.isLogged === true ? <Navigate replace to="/" /> : <Auth />
              }
            />
            <Route
              path="/login-success"
              element={
                auth.isLogged === true ? (
                  <Navigate replace to="/" />
                ) : (
                  <LoginSuccess />
                )
              }
            />
            {/* Protected routes */}
            <Route
              path="/cart"
              element={
                auth.isLogged === false ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Cart />
                )
              }
            />
            <Route
              path="/user"
              element={
                auth.isLogged === false ? (
                  <Navigate replace to="/login" />
                ) : (
                  <User />
                )
              }
            />

            <Route
              path="/add"
              element={
                auth.isAdmin === false ? (
                  <Navigate replace to="/" />
                ) : (
                  <ProductForm />
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                auth.isAdmin === false ? (
                  <Navigate replace to="/" />
                ) : (
                  <ProductForm />
                )
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
