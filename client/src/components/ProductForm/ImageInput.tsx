import { ChangeEvent } from "react";
import { InputLabel, Input } from "@mui/material";
import { image } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import { axiosInstance } from "../../utils/axiosInstance";
import useMakeNetworkRequest from "../../hooks/useMakeNetworkRequest";

type Props = {
  setUploadingImg: Function;
  setImages: Function;
  images: image[];
  uploadingImg: boolean;
  deletingImg: boolean;
};

const ImageInput = ({
  setUploadingImg,
  setImages,
  images,
  uploadingImg,
  deletingImg,
}: Props) => {
  const dispatch = useAppDispatch();
  const { executeServerRequest } = useMakeNetworkRequest();

  const handleImgUpload = async (e: ChangeEvent) => {
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

    executeServerRequest(
      async () => {
        setUploadingImg(true);
        const res = await axiosInstance({
          method: "post",
          url: "/api/image",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        setImages([...images, res.data]);
        setUploadingImg(false);
      },
      [],
      true,
      "Uploaded Image!"
    );
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
