type image = {
  public_id: string;
  url: string;
};

type Product = {
  category: string;
  color: string;
  createdAt: string;
  description: string;
  favorite: number;
  images: image[];
  inStock: number;
  orders: number;
  price: number;
  size: string[];
  sleeve: string;
  title: string;
  updatedAt: string;
  views: number;
  __v: number;
  _id: string;
};

interface CartProduct {
  createdAt: string;
  product: Product;
  quantity: number;
  selected: boolean;
  size: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

// Filters
type Filters = {
  category: string[];
  sleeve: string[];
  color: string[];
  size: string[];
};

type PriceFilter = {
  min: number;
  max: number;
};

type FilterKey = keyof Filters;

// Admin Product
type ProductInputData = {
  title: string;
  description: string;
  price: number;
  inStock: number;
};

type ProductInputDataKey = keyof ProductInputData;

type SelectInputData = {
  category: string;
  sleeve: string;
  color: string;
  size: string[];
};

type SelectInputDataKey = keyof SelectInputData;

export type {
  image,
  Product,
  CartProduct,
  Filters,
  FilterKey,
  PriceFilter,
  ProductInputData,
  ProductInputDataKey,
  SelectInputData,
  SelectInputDataKey,
};
