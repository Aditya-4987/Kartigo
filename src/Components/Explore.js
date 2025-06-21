import React, { useState, useEffect } from "react";
import PriceSlider from "./PriceSlider";
import "./Explore.css";
import ExploreProduct from "./ExploreProduct";
import { getAllProducts, getProductCategories } from "../utils/productData";

function Explore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });

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
  }, []);

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

    return isInPriceRange && isInSelectedCategory && isInSelectedBrand;
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
