import productsData from "../tempDatabase_json/products.json";

export const getAllProducts = () => {
  return productsData;
};

// New function to search products by query
export const searchProducts = (query) => {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return [];
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return productsData.filter((product) => {
    const title = product.title?.toLowerCase() || '';
    const brand = product.Brand?.toLowerCase() || '';
    const category = product.Category?.toLowerCase() || '';

    // Check if all search terms are found in the product data
    return searchTerms.every(term => 
      title.includes(term) || 
      brand.includes(term) || 
      category.includes(term)
    );
  });
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
