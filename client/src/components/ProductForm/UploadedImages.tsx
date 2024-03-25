import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { image } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import "./UploadedImages.css";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";

type Props = {
  images: image[];
  uploadingImg: boolean;
  deletingImg: boolean;
  setDeletingImg: Function;
  setImages: Function;
};

const UploadedImages = ({
  images,
  uploadingImg,
  deletingImg,
  setDeletingImg,
  setImages,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { executeServerRequest } = useMakeNetworkRequest();

  const handleImgDelete = async (publicId: string) => {
    executeServerRequest(async () => {
      setDeletingImg(true);
      const res = await axiosInstance.delete(`/api/image/${publicId}`);
      setImages(
        images.filter((img) => {
          return img.public_id !== publicId;
        })
      );
      setDeletingImg(false);
      dispatch({ type: "SUCCESS", payload: res.data });
    });
  };

  return (
    <ul id="uploaded-images" className="center">
      {images.length
        ? images.map((item, index) => (
            <li key={index}>
              <button
                disabled={uploadingImg || deletingImg}
                onClick={() => handleImgDelete(item.public_id)}
              >
                <Delete />
              </button>
              <img src={item.url} alt="Product" />
            </li>
          ))
        : ""}
      {uploadingImg && (
        <li>
          <CircularProgress />
        </li>
      )}
    </ul>
  );
};

export default UploadedImages;
