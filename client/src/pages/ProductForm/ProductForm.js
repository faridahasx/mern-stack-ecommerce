import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ProductForm.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosBaseInstance, axiosInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import UploadedImages from "../../components/product-form/UploadedImages";
import ImageInput from "../../components/product-form/ImageInput";
import DataInput from "../../components/product-form/DataInput";
import SelectInput from "../../components/product-form/SelectInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import { ButtonProgress } from "../../components/loading/Loading";
const ProductForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [images, setImages] = useState([]);
    const [page, setPage] = useState("");
    const [productID, setProductID] = useState("");
    const [uploadingImg, setUploadingImg] = useState(false);
    const [deletingImg, setDeletingImg] = useState(false);
    const { executeServerRequest, loading } = useMakeNetworkRequest();
    const [inputData, setInputData] = useState({
        title: "",
        description: "",
        price: 0,
        inStock: 0,
    });
    const [selectInputData, setSelectInputData] = useState({
        category: "",
        sleeve: "",
        color: "",
        size: [],
    });
    useEffect(() => {
        let loc = location.pathname.split("/");
        let page_ = loc[1];
        setPage(page_);
        if (page_ === "edit") {
            let id = loc[2];
            setProductID(id);
            executeServerRequest(async () => {
                const res = await axiosBaseInstance.get(`/api/products/${id}`);
                setImages(res.data.images);
                setSelectInputData({
                    category: res.data.category,
                    sleeve: res.data.sleeve,
                    color: res.data.color,
                    size: res.data.size,
                });
                setInputData({
                    title: res.data.title,
                    description: res.data.description,
                    price: res.data.price,
                    inStock: res.data.inStock,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        executeServerRequest(async () => {
            if (images.length < 1)
                return dispatch({ type: "ERROR", payload: "Empty Image Field" });
            if (page === "add") {
                const res = await axiosInstance.post("/api/products", {
                    ...inputData,
                    images: images,
                    ...selectInputData,
                });
                setImages([]);
                dispatch({ type: "SUCCESS", payload: res.data });
            }
            else if (page === "edit") {
                const res = await axiosInstance.put(`/api/products/${productID}`, {
                    ...inputData,
                    images: images,
                    ...selectInputData,
                });
                dispatch({ type: "SUCCESS", payload: res.data });
                navigate(`/product/${productID}`);
            }
        });
    };
    return (_jsxs(Layout, { children: [_jsx(UploadedImages, { images: images, uploadingImg: uploadingImg, deletingImg: deletingImg, setDeletingImg: setDeletingImg, setImages: setImages }), _jsxs("form", { id: "product-form", className: "center column", onSubmit: handleFormSubmit, children: [_jsx(ImageInput, { images: images, uploadingImg: uploadingImg, deletingImg: deletingImg, setImages: setImages, setUploadingImg: setUploadingImg }), _jsx(DataInput, { inputData: inputData, setInputData: setInputData }), _jsx(SelectInput, { selectInputData: selectInputData, setSelectInputData: setSelectInputData }), _jsx(SubmitButton, { type: "submit", disabled: loading || uploadingImg || deletingImg, children: loading ? _jsx(ButtonProgress, {}) : "Save" })] })] }));
};
export default ProductForm;
