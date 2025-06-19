import React from "react";
import PriceSlider from "./PriceSlider";
import "./Explore.css";
import ExploreProduct from "./ExploreProduct";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div className="explore">
      <div className="explore-sidebar">
        <div className="explore-sidebar-priceSlider">
          <PriceSlider />
          <div className="explore-sidebar-product-catgories">
            <h4 className="categories-heading">Categories</h4>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="smartPhonesTablets"
                className="sidebar-checkbox"
              />
              <label htmlFor="smartPhonesTablets">
                Smart Phones & tablets{" "}
              </label>
            </span>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="laptops"
                className="sidebar-checkbox"
              />
              <label htmlFor="laptops">Laptops</label>
            </span>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="displays"
                className="sidebar-checkbox"
              />
              <label htmlFor="displays">Displays</label>
            </span>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="wearables"
                className="sidebar-checkbox"
              />
              <label htmlFor="wearables">Wearables</label>
            </span>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="audioDevices"
                className="sidebar-checkbox"
              />
              <label htmlFor="audioDevices">Audio Devices</label>
            </span>
            <span className="sidebar-checkbox-span">
              <input
                type="checkbox"
                id="accessories"
                className="sidebar-checkbox"
              />
              <label htmlFor="accessories">Accessories</label>
            </span>
          </div>
        </div>
      </div>
      <div className="explore-content">
        <h2 className="explore-content-heading">Explore Products</h2>
        <div className="explore-content-products">
          <Link to="/product/1">
            <ExploreProduct
              image={
                "https://m.media-amazon.com/images/I/61aPY8odPSL._AC_SL1500_.jpg"
              }
              title={
                "Apple iPad 11-inch: A16 chip, 11-inch Model, Liquid Retina Display, 128GB, Wi-Fi 6, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue "
              }
              price={299.0}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Explore;
