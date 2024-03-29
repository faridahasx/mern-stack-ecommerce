const sortValues: { [index: string]: any } = {
  "Price high to low": "sort=price:-1",
  "Price low to high": "sort=price:1",
  Popular: "sort=views:-1",
  Newest: "sort=createdAt:-1",
};

const filterValues: { [index: string]: any } = {
  category: ["Sweaters", "Sweatshirts", "T-Shirts", "Jackets"],
  sleeve: ["Sleeveless", "Long sleeve", "Short sleeve"],
  color: [
    "Multi",
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Pink",
    "Red",
    "White",
    "Yellow",
  ],
  size: ["xs", "s", "m", "l", "xl", "xxl", "2xl", "3xl", "4xl", "5xl"],
  price: [],
};

const productValues: { [index: string]: any } = {
  category: ["Sweaters", "Sweatshirts", "T-Shirts", "Jackets"],
  sleeve: ["Sleeveless", "Long sleeve", "Short sleeve"],
  color: [
    "Multi",
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Pink",
    "Red",
    "White",
    "Yellow",
  ],
  size: ["xs", "s", "m", "l", "xl", "xxl", "2xl", "3xl", "4xl", "5xl"],
};

const homeSliderList = [
  {
    image: {
      public_id: "5BLINGS/cu7uocaeyuldbf62iae5",
      url: "sweater.jpg",
    },
    link: "Sweaters",
    heading: "Shop for Sweaters",

    bg: "linear-gradient(to right, #c2c6c3  , #dedddb, #4a8fb6 )",
  },
  {
    image: {
      public_id: "5BLINGS/c1docmdbw92vhyjwyjnu",
      url: "sweatshirt.jpg",
    },
    link: "Sweatshirts",
    heading: "Shop for Sweatshirts",
    bg: "linear-gradient(to left, #0188a6 , #f0f0f0,  #3aa8c7)",
  },
  {
    image: {
      public_id: "5BLINGS/eseyfceovfojeekntb6t",
      url: "t-shirt.jpg",
    },
    link: "T-Shirts",
    heading: "Shop for T-Shirts",
    bg: "linear-gradient(to right,  #e5e0da , #f0f0f0 , #e5e0da )",
  },
];
export { sortValues, filterValues, homeSliderList, productValues };
