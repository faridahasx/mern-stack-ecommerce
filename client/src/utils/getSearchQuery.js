const getSearchQuery = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get("category");
    const sleeve = searchParams.get("sleeve");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    const searchInput = searchParams.get("search");
    return `${searchInput ? "&title[regex]=" + searchInput : ""}${category && category !== "All" ? "&category[in]=" + category : ""}${sleeve ? "&sleeve[in]=" + sleeve : ""}${color ? "&color[in]=" + color : ""}${size ? "&size[in]=" + size : ""}${sort ? "&" + sort : ""}${minPrice ? "&price[gte]=" + minPrice : ""}${maxPrice ? "&[price][lte]=" + maxPrice : ""}`;
};
export default getSearchQuery;
