import { useEffect, useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductInputData, SelectInputData, image } from "../../assets/types";
import { useAppDispatch } from "../../hooks/useStoreTypes";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { axiosBaseInstance, getAuthInstance } from "../../utils/axiosInstance";
import Layout from "../../components/Layout";
import UploadedImages from "../../components/admin/UploadedImages";
import ImageInput from "../../components/admin/ImageInput";
import DataInput from "../../components/admin/DataInput";
import SelectInput from "../../components/admin/SelectInput";
import "./styles.css";

const AdminProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnline = useNetworkStatus();
  const [images, setImages] = useState<Array<image>>([]);
  const [page, setPage] = useState("");
  const [productID, setProductID] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [deletingImg, setDeletingImg] = useState(false);

  const [inputData, setInputData] = useState<ProductInputData>({
    title: "",
    description: "",
    price: 0,
    inStock: 0,
  });

  const [selectInputData, setSelectInputData] = useState<SelectInputData>({
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
      const fetchProduct = async () => {
        try {
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
        } catch (err) {}
      };
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) return;
    try {
      const authInstance = await getAuthInstance();
      if (!authInstance) return navigate("/login");
      if (images.length < 1)
        return dispatch({ type: "ERROR", payload: "Empty Image Field" });
      if (page === "add") {
        const res = await authInstance.post("/api/products", {
          ...inputData,
          images: images,
          ...selectInputData,
        });
        setImages([]);
        dispatch({ type: "SUCCESS", payload: res.data });
      } else if (page === "edit") {
        const res = await authInstance.put(`/api/products/${productID}`, {
          ...inputData,
          images: images,
          ...selectInputData,
        });
        dispatch({ type: "SUCCESS", payload: res.data });
        navigate(`/product/${productID}`);
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: "Something went wrong",
      });
    }
  };

  return (
    <Layout>
      <main className="center column">
        <UploadedImages
          images={images}
          uploadingImg={uploadingImg}
          deletingImg={deletingImg}
          setDeletingImg={setDeletingImg}
          setImages={setImages}
        />
        <form
          id="admin-form"
          className="center column"
          onSubmit={handleFormSubmit}
        >
          <ImageInput
            images={images}
            uploadingImg={uploadingImg}
            deletingImg={deletingImg}
            setImages={setImages}
            setUploadingImg={setUploadingImg}
            isOnline={isOnline}
          />
          <DataInput inputData={inputData} setInputData={setInputData} />
          <SelectInput
            selectInputData={selectInputData}
            setSelectInputData={setSelectInputData}
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </main>
    </Layout>
  );
};

export default AdminProduct;
