import React, { useState, useEffect } from "react";
import PriceSlider from "./PriceSlider";
import "./Explore.css";
import ExploreProduct from "./ExploreProduct";
import { getAllProducts, getProductCategories } from "../utils/productData";
import { useStateValue } from "../StateProvider";
import { useNavigate, useLocation } from "react-router-dom";

function Explore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });
  const [{ search }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load all products
    const allProducts = getAllProducts();
    setProducts(allProducts);

    // Get unique categories
    const allCategories = getProductCategories();
    setCategories(allCategories);

    // Get unique brands
    const allBrands = [
      ...new Set(allProducts.map((product) => product.Brand).filter(Boolean)),
    ];
    setBrands(allBrands);

    // Check if we need to redirect to a product detail page
    if (location.state?.redirectToProduct) {
      const productId = location.state.redirectToProduct;
      // Allow the explore page to render first
      setTimeout(() => {
        navigate(`/product/${productId}`);
      }, 100);
    }
  }, [location.state, navigate]);

  const filteredProducts = products.filter((product) => {
    // Filter by price
    const isInPriceRange =
      product.Price >= priceRange.min && product.Price <= priceRange.max;

    // Filter by selected categories (if any are selected)
    const isInSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.Category);

    // Filter by selected brands (if any are selected)
    const isInSelectedBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.Brand);

    // Filter by search query (if active)
    let matchesSearch = true;
    if (search.isActive && search.query) {
      const searchTerms = search.query.toLowerCase().trim().split(/\s+/);
      const title = product.title?.toLowerCase() || "";
      const brand = product.Brand?.toLowerCase() || "";
      const category = product.Category?.toLowerCase() || "";

      matchesSearch = searchTerms.every(
        (term) =>
          title.includes(term) ||
          brand.includes(term) ||
          category.includes(term)
      );
    }

    return (
      isInPriceRange &&
      isInSelectedCategory &&
      isInSelectedBrand &&
      matchesSearch
    );
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="explore">
      <div className="explore-sidebar">
        <div className="explore-sidebar-priceSlider">
          {/* Search filter (if active) */}
          {search.isActive && search.query && (
            <div className="explore-sidebar-search-filter">
              <h4 className="search-filter-heading">Search for: </h4>
              <div className="search-filter-query">
                <span>{search.query}</span>
                <button
                  className="search-filter-clear-btn"
                  onClick={() => dispatch({ type: "CLEAR_SEARCH" })}
                  aria-label="Clear search"
                >
                  X
                </button>
              </div>
            </div>
          )}

          <PriceSlider onChange={handlePriceChange} />

          {/* Categories filter */}
          <div className="explore-sidebar-product-catgories">
            <h4 className="categories-heading">Categories</h4>
            {categories.map((category) => (
              <span key={category} className="sidebar-checkbox-span">
                <input
                  type="checkbox"
                  id={category}
                  className="sidebar-checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </span>
            ))}
          </div>

          {/* Brands filter */}
          <div className="explore-sidebar-product-brands">
            <h4 className="categories-heading">Brands</h4>
            {brands.map((brand) => (
              <span key={brand} className="sidebar-checkbox-span">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  className="sidebar-checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="explore-content">
        <h2 className="explore-content-heading">Explore Products</h2>
        <div className="explore-content-products">
          {filteredProducts.map((product) => (
            <ExploreProduct
              key={product.id}
              product_id={product.id}
              image={product.mainImage}
              title={product.title}
              price={product.Price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
