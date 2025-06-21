import productsData from "../tempDatabase_json/products.json";

export const getAllProducts = () => {
  return productsData;
};

export const getProductById = (id) => {
  return productsData.find((product) => product.id === id) || null;
};

export const getProductsByCategory = (category) => {
  return productsData.filter(
    (product) => product.Category?.toLowerCase() === category?.toLowerCase()
  );
};

export const getProductCategories = () => {
  const categories = productsData
    .map((product) => product.Category)
    .filter(Boolean); // Filter out undefined/null categories
  return [...new Set(categories)]; // Return unique categories
};

export const formatPrice = (price) => {
  if (!price && price !== 0) return "0";
  return price.toLocaleString("en-IN");
};
