import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { image } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { getAuthInstance } from "../../utils/axiosInstance";

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

  const handleImgDelete = async (publicId: string) => {
    try {
      setDeletingImg(true);
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      const res = await authInstance.delete(`/api/image/${publicId}`);
      setImages(
        images.filter((img) => {
          return img.public_id !== publicId;
        })
      );
      setDeletingImg(false);
      dispatch({ type: "SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong",
      });
    }
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
