/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import {
  FaBox,
  FaRegCheckCircle,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";
import { FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

const ProductDetails = () => {
  const [selectedVariant, setSelectedVariant] = useState(12345678);
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [specificationExpanded, setSpecificationExpanded] = useState(false);

  const selectedVariation = product?.variations?.[selectedVariationIndex];
  const maxQuantity = selectedVariation?.total_stock_qty || 0;

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://157.230.240.97:9999/api/v1/product/iphone-15-plus"
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const updateQuantity = (change) => {
    setQuantity((prev) => {
      const newQty = prev + change;
      if (newQty < 0) return 0;
      if (newQty > maxQuantity) return maxQuantity;
      return newQty;
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      product,
      selectedVariant,
      quantity,
      selectedColor,
    };
    addToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
        <span className="loading loading-ball loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white px-4 sm:px-6 py-3">
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span>Home</span>
          <span>›</span>
          <span>Electronic</span>
          <span>›</span>
          <span className="text-gray-900">iPhone 15 Plus</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 3xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images */}
          <div>
            <div className="bg-gray-200 rounded-lg mb-4">
              <img
                src={product?.image?.[1]?.url}
                alt="Product"
                className="w-full h-80 sm:h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product?.variations?.map((variation, index) => (
                <div key={variation.id} className="flex-shrink-0">
                  <img
                    src={variation.image}
                    alt={`Var ${index + 1}`}
                    className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded bg-gray-200 cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h1 className="text-lg sm:text-xl font-medium text-gray-900">
              Apple iPhone 15 Plus – Premium Smartphone...
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base sm:text-lg font-medium">
                {product?.rating || 4.7}
              </span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5" />
                ))}
              </div>
              <span className="text-gray-600 text-sm sm:text-base">
                {product?.reviewCount?.toLocaleString() || 2254}
              </span>
              <div className="ml-auto flex gap-2">
                <button className="text-gray-400 hover:text-red-500">
                  <FaRegHeart />
                </button>
                <button className="text-gray-400 hover:text-blue-500">
                  <IoShareSocialOutline />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-teal-600">
                {product?.currency || "৳"}
                {product?.product_detail?.discount_price}
              </span>
              <span className="text-base text-gray-400 line-through">
                {product?.currency || "৳"}
                {product?.product_detail?.regular_price}
              </span>
            </div>

            {/* Colors */}
            <div>
              <span className="text-sm font-medium">Available Color:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product?.variations.map((variation, index) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedColor(index)}
                    className={`w-14 h-14 border-2 rounded overflow-hidden relative ${
                      selectedColor === index
                        ? "border-teal-500"
                        : "border-gray-200"
                    } ${
                      !variation.total_stock_qty > 0 ? "opacity-50" : ""
                    }`}
                    disabled={!variation.total_stock_qty > 0}
                  >
                    <img
                      src={variation.image}
                      alt={`Color ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {!variation.total_stock_qty > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-gray-400 rotate-45"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <span className="text-sm font-medium">Select Variant:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product?.variations?.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedVariant(variation?.barcode)}
                    className={`px-3 py-2 text-sm rounded border transition ${
                      selectedVariant === variation?.barcode
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : !variation.total_stock_qty > 0
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                    disabled={!variation.total_stock_qty > 0}
                  >
                    {variation?.barcode}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm font-medium block mb-2">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="w-8 h-8 border rounded hover:bg-gray-50"
                >
                  <HiMinusSm />
                </button>
                <span className="w-10 text-center text-lg font-medium">
                  {quantity.toString().padStart(2, "0")}
                </span>
                <button
                  onClick={() => updateQuantity(1)}
                  className="w-8 h-8 border rounded hover:bg-gray-50"
                >
                  <BsPlus />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Stock available: {maxQuantity}
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={maxQuantity === 0 || quantity === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                maxQuantity === 0 || quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
              }`}
            >
              {maxQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {/* Delivery + Seller */}
          <div className="space-y-6">
            {/* Delivery */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium mb-4">Delivery Options</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 border-2 border-teal-500 rounded flex items-center justify-center">
                    <FaBox className="text-teal-500" />
                  </div>
                  <div>
                    <div className="font-medium">Regular</div>
                    <div className="text-sm text-gray-600">
                      Delivery within 2–3 days
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-start opacity-50">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                    <CiClock2 className="text-gray-300" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-400">Express</div>
                    <div className="text-sm text-red-500">Not Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  BFH
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">
                      {product?.seller?.name || "BD Tech House"}
                    </span>
                    <FaRegCheckCircle className="text-blue-500 w-4 h-4" />
                  </div>
                  <span className="text-xs bg-gradient-to-r from-orange-400 to-purple-600 text-white px-2 py-1 rounded-full inline-block mt-1">
                    ⭐ Rising Star
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <button className="flex items-center text-teal-600 text-sm">
                  <FiMessageCircle className="mr-1" />
                  Chat Now
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  View Shop
                </button>
              </div>
              <div className="grid grid-cols-3 text-center text-sm gap-4">
                <div>
                  <div className="text-gray-600">Ship on Time</div>
                  <div>{product?.seller?.stats.shipOnTime || 100}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Chat Response</div>
                  <div>{product?.seller?.stats.chatResponse || 90}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Shop Rating</div>
                  <div>{product?.seller?.stats.shopRating || 99.8}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description + Spec */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 3xl:px-0">
        {/* Description */}
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          <p className="text-sm text-gray-600">
            Just as a book is judged by its cover, the first thing you notice
            when you pick up a modern smartphone is the display...
          </p>
          {descriptionExpanded && (
            <p className="text-sm text-gray-600 mt-3">
              Advanced technologies allow you to practically level...
            </p>
          )}
          <button
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="flex items-center gap-2 text-sm text-gray-600 mt-4"
          >
            <span>See More</span>
            {descriptionExpanded ? <IoIosArrowUp /> : <MdKeyboardArrowDown />}
          </button>
        </div>

        {/* Specification */}
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Specification</h2>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>GMP Cosmetic Good Manufacturing Practice</li>
            <li>Cruelty Free</li>
            <li>No Animal Testing</li>
            <li>Zenus Global Standard</li>
            {specificationExpanded && <li>Comply with Global Standard</li>}
          </ul>
          <button
            onClick={() => setSpecificationExpanded(!specificationExpanded)}
            className="flex items-center gap-2 text-sm text-gray-600 mt-4"
          >
            <span>See More</span>
            {specificationExpanded ? <IoIosArrowUp /> : <MdKeyboardArrowDown />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

