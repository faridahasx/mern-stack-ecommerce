import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Styles
import "./App.css";
// External imports
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Custom hooks
import useNetworkStatus from "./hooks/useNetworkStatus";
import { useAppDispatch, useAppSelector } from "./hooks/useStoreTypes";
import useWindowSize from "./hooks/useWindowSize";
// Utils
import { axiosInstance } from "./utils/axiosInstance";
// Components
import { Transition } from "./components/Loading/Loading";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import Alert from "./components/Alerts/Alert";
import NoInternetAlert from "./components/Alerts/NoInternetAlert";
// Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const Product = lazy(() => import("./pages/SingleProduct/SingleProduct"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const LoginSuccess = lazy(() => import("./pages/LoginSuccess"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const User = lazy(() => import("./pages/User/User"));
const ProductForm = lazy(() => import("./pages/ProductForm/ProductForm"));
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
            }
            catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem("firstLogin");
                }
            }
        };
        if (!auth.isLogged && localStorage.getItem("firstLogin"))
            getCredentials();
    }, [auth.isLogged]);
    return (_jsxs(BrowserRouter, { children: [_jsx(Alert, {}), !isOnline && _jsx(NoInternetAlert, {}), _jsx(ErrorBoundary, { children: _jsx(Suspense, { fallback: _jsx(Transition, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/products", element: _jsx(Products, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(Product, {}) }), _jsx(Route, { path: "/login", element: auth.isLogged ? _jsx(Navigate, { replace: true, to: "/" }) : _jsx(Auth, {}) }), _jsx(Route, { path: "/register", element: auth.isLogged ? _jsx(Navigate, { replace: true, to: "/" }) : _jsx(Auth, {}) }), _jsx(Route, { path: "/login-success", element: auth.isLogged ? _jsx(Navigate, { replace: true, to: "/" }) : _jsx(LoginSuccess, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/user", element: _jsx(User, {}) }), _jsx(Route, { path: "/add", element: !auth.isAdmin ? _jsx(Navigate, { replace: true, to: "/" }) : _jsx(ProductForm, {}) }), _jsx(Route, { path: "/edit/:id", element: !auth.isAdmin ? _jsx(Navigate, { replace: true, to: "/" }) : _jsx(ProductForm, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }) })] }));
}
export default App;
