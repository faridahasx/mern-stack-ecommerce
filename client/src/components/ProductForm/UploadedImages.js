import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./UploadedImages.css";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";
import { axiosInstance } from "../../utils/axiosInstance";
const UploadedImages = ({ images, uploadingImg, deletingImg, setDeletingImg, setImages, }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { executeServerRequest } = useMakeNetworkRequest();
    const handleImgDelete = async (publicId) => {
        executeServerRequest(async () => {
            setDeletingImg(true);
            const res = await axiosInstance.delete(`/api/image/${publicId}`);
            setImages(images.filter((img) => {
                return img.public_id !== publicId;
            }));
            setDeletingImg(false);
            dispatch({ type: "SUCCESS", payload: res.data });
        });
    };
    return (_jsxs("ul", { id: "uploaded-images", className: "center", children: [images.length
                ? images.map((item, index) => (_jsxs("li", { children: [_jsx("button", { disabled: uploadingImg || deletingImg, onClick: () => handleImgDelete(item.public_id), children: _jsx(Delete, {}) }), _jsx("img", { src: item.url, alt: "Product" })] }, index)))
                : "", uploadingImg && (_jsx("li", { children: _jsx(CircularProgress, {}) }))] }));
};
export default UploadedImages;
