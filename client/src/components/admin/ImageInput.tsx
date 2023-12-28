import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel, Input } from "@mui/material";
import { image } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { getAuthInstance } from "../../utils/axiosInstance";

type Props = {
  setUploadingImg: Function;
  setImages: Function;
  images: image[];
  uploadingImg: boolean;
  deletingImg: boolean;
  isOnline: boolean;
};

const ImageInput = ({
  setUploadingImg,
  setImages,
  images,
  uploadingImg,
  deletingImg,
  isOnline,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleImgUpload = async (e: ChangeEvent) => {
    if (!isOnline) return;
    let target = e.target as HTMLInputElement;
    e.preventDefault();
    let file = target.files && target.files[0];
    if (!file)
      return dispatch({ type: "ERROR", payload: "File doesn't exist." });
    if (file.size > 1024 * 1024)
      // 1mb
      return dispatch({ type: "ERROR", payload: "Size too large!" });
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispatch({ type: "ERROR", payload: "File format is incorrect" });
    let formData = new FormData();
    formData.append("file", file);
    try {
      setUploadingImg(true);
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      const res = await authInstance({
        method: "post",
        url: "/api/image",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages([...images, res.data]);
      dispatch({ type: "SUCCESS", payload: "Uploaded Image!" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: "Something went wrong.",
      });
    }
    setUploadingImg(false);
  };

  return (
    <>
      <InputLabel htmlFor="file"> Select Images: </InputLabel>
      <Input
        className="product-input"
        type="file"
        name="file"
        onChange={handleImgUpload}
        disabled={uploadingImg || deletingImg || images.length > 6}
      />
    </>
  );
};

export default ImageInput;
