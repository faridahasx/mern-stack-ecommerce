// External imports
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// MUI Components
import ErrorIcon from "@mui/icons-material/Error";
// Custom hooks
import useNetworkStatus from "./hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "./hooks/useStoreTypes";
// Utils
import { getAuthInstance } from "./utils/axiosInstance";
// Components
import { Transition } from "./components/loading/Loading";
import ErrorBoundary from "./components/error/ErrorBoundary";
// Styles
import "./App.css";
// Pages
const Home: any = lazy(() => import("./pages/Home/Home"));
const Products: any = lazy(() => import("./pages/Products/Products"));
const Product: any = lazy(() => import("./pages/SingleProduct/SingleProduct"));
const Auth: any = lazy(() => import("./pages/Auth/Auth"));
const ForgotPassword: any = lazy(
  () => import("./pages/ForgotAndResetPassword/ForgotPassword")
);
const ResetPassword: any = lazy(
  () => import("./pages/ForgotAndResetPassword/ResetPassword")
);
const LoginSuccess: any = lazy(() => import("./pages/LoginSuccess"));
const Cart: any = lazy(() => import("./pages/Cart/Cart"));
const User: any = lazy(() => import("./pages/User/User"));
const AdminProduct: any = lazy(() => import("./pages/Admin/AdminProduct"));


function App() {
  const alert = useAppSelector((state) => state.alert);
  const auth = useAppSelector((state) => state.auth);
  const isTransitioning = useAppSelector(
    (state) => state.transition.isTransitioning
  );
  const { error, success } = alert;
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const getUser = async () => {
      try {
        const authInstance = await getAuthInstance();
        if (!authInstance) {
          dispatch({ type: "IS_LOGGED", payload: false });
          dispatch({ type: "IS_ADMIN", payload: false });
          return;
        }

        const res = await authInstance.get("/api/user/info");
        dispatch({ type: "IS_ADMIN", payload: res.data.isAdmin });
        !auth.isLogged && dispatch({ type: "IS_LOGGED", payload: true });
      } catch (err) {}
    };
    getUser();
  }, [auth.isLogged]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: "ERROR", payload: "" });
      }, 4000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: "SUCCESS", payload: "" });
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <BrowserRouter>
      {isTransitioning === true ? <Transition /> : ""}
      {(error || success) && (
        <div className="alert-container">
          {error && (
            <div className="center error">
              <ErrorIcon />
              <span className="center">{error}</span>
            </div>
          )}
          {success && (
            <div className="center success">
              <span className="center">{success}</span>
            </div>
          )}
        </div>
      )}
      {!isOnline && (
        <div id="no-internet-connection" className="center">
          No internet connection
        </div>
      )}
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
            <Route
              path="/forgot-password"
              element={
                auth.isLogged ? <Navigate replace to="/" /> : <ForgotPassword />
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                auth.isLogged ? <Navigate replace to="/" /> : <ResetPassword />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            {/* Admin Routes  */}
            <Route
              path="/add"
              element={
                !auth.isAdmin ? <Navigate replace to="/" /> : <AdminProduct />
              }
            />
            <Route
              path="/edit/:id"
              element={
                !auth.isAdmin ? <Navigate replace to="/" /> : <AdminProduct />
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
