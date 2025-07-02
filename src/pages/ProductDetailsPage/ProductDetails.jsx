/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { FaBox, FaRegCheckCircle, FaRegHeart, FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiClock2, CiStar } from "react-icons/ci";
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
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0); // default first variation
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
        console.log("res.data:", response.data.data);
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
    // const selectedVariant = product.variations[selectedVariationIndex];
    const selectedVariant = selectedVariation;

    const cartItem = {
      product,
      selectedVariant,
      quantity,
      selectedColor,
    };

    addToCart(cartItem);
    console.log("Item added to cart:", cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {/* <div className="text-lg">Loading...</div> */}
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
      <div className="bg-white px-6 py-3">
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span>Home</span>
          <span>›</span>
          <span>Electronic</span>
          <span>›</span>
          <span className="text-gray-900">iPhone 15 Plus</span>
        </div>
      </div>

      {/* Product Details with Delivery Options Container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-lg mb-4">
              <img
                src={product?.image?.[1]?.url}
                alt="Product main image"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-hidden">
              {product?.variations?.map((variation, index) => (
                <div key={variation.id} className="flex-shrink-0">
                  <img
                    src={variation.image}
                    alt={`Product variation ${index + 1}`}
                    className="w-24 h-32 object-cover rounded bg-gray-200 cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-1">
            <h1 className="text-xl font-medium text-gray-900 mb-3">
              Apple iPhone 15 Plus – Premium Smartphone with A16 Bionic Chip,
              Dual Cameras & All-Day Battery
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="text-lg font-medium mr-2">
                {product?.rating || 4.7}
              </span>
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">
                {product?.reviewCount?.toLocaleString() || 2254}
              </span>
              <button className="ml-2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="ml-auto flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500">
                  {/* <Heart className="w-5 h-5" /> */}
                  <FaRegHeart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500">
                  {/* <Share2 className="w-5 h-5" /> */}
                  <IoShareSocialOutline className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-teal-600">
                {product?.currency || "৳"}
                {product?.product_detail?.discount_price}
              </span>
              <span className="text-lg text-gray-400 line-through ml-2">
                {product?.currency || "৳"}
                {product?.product_detail?.regular_price}
              </span>
            </div>

            {/* Promotion */}
            {product?.promotion?.active && (
              <div className="mb-6">
                <span className="text-sm text-gray-600 mr-2">Promotion</span>
                <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded">
                  {product?.promotion.text || "Min. spend ৳550"}
                  <svg
                    className="inline w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-6">
              <div className="mb-3">
                <span className="text-sm font-medium">Available Color: </span>
                <span className="text-sm">Navy Blue</span>
              </div>
              <div className="flex space-x-2">
                {product?.variations.map((variation, index) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedColor(index)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden relative ${
                      selectedColor === index
                        ? "border-teal-500"
                        : "border-gray-200"
                    } ${!variation.total_stock_qty > 0 ? "opacity-50" : ""}`}
                    disabled={!variation.total_stock_qty > 0}
                    title={
                      variation.variation_attributes?.[0]?.value ||
                      `Color ${index + 1}`
                    }
                  >
                    <img
                      src={variation.image}
                      alt={
                        variation.variation_attributes?.[0]?.value ||
                        `Color ${index + 1}`
                      }
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
            <div className="mb-6">
              <div className="mb-3">
                <span className="text-sm font-medium">Select Variant: </span>
                <span className="text-sm font-regular">{selectedVariant}</span>
              </div>
              <div className="flex space-x-2">
                {product?.variations?.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedVariant(variation?.barcode)}
                    className={`px-4 py-2 border rounded text-sm font-medium transition ${
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
            <div className="mb-6">
              <span className="text-sm font-medium block mb-3">Quantity</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <HiMinusSm className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity.toString().padStart(2, "0")}
                </span>
                <button
                  onClick={() => updateQuantity(1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <BsPlus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Stock available: {maxQuantity}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-6">
              <button
                onClick={handleAddToCart}
                disabled={maxQuantity === 0 || quantity === 0}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                  maxQuantity === 0 || quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800 hover:shadow-lg"
                }`}
              >
                {maxQuantity === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Delivery & Seller Info */}
          <div className="lg:col-span-1">
            {/* Delivery Options */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-4">Delivery Options</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 border-2 border-teal-500 rounded mr-3 flex items-center justify-center">
                    {/* <Truck className="w-4 h-4 text-teal-500" /> */}
                    <FaBox className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <div className="font-medium">Regular</div>
                    <div className="text-sm text-gray-600">
                      Delivery within 2-3 days
                    </div>
                  </div>
                </div>

                <div className="flex items-center opacity-50">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded mr-3 flex items-center justify-center">
                    {/* <Clock className="w-4 h-4 text-gray-300" /> */}
                    <CiClock2 className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-400">Express</div>
                    <div className="text-sm text-red-500">Not Available</div>
                    <div className="text-sm text-gray-400">
                      Delivery within 24 Hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Sold by</span>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  BFH
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {product?.seller?.name || "BD Tech House"}
                    </span>
                    <FaRegCheckCircle className="w-4 h-4 text-blue-500 ml-1" />
                  </div>
                  <div className="bg-gradient-to-r from-orange-400 to-purple-600 text-white text-xs px-2 py-1 rounded-full inline-block mt-1">
                    ⭐ Rising Star
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button className="flex items-center text-teal-600 text-sm">
                  {/* <MessageCircle className="w-4 h-4 mr-2" /> */}
                  <FiMessageCircle className="w-4 h-4 mr-2" />
                  Chat Now
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  View Shop
                </button>
              </div>

              {/* Seller Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-600">Ship on Time</div>
                  <div className="text-lg font-regular">
                    {product?.seller?.stats.shipOnTime || 100}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Chat Response</div>
                  <div className="text-lg font-regular">
                    {product?.seller?.stats.chatResponse || 90}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Shop Rating</div>
                  <div className="text-lg font-regular">
                    {product?.seller?.stats.shopRating || 99.8}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Specification Container */}
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Description
          </h2>

          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              Just as a book is judged by its cover, the first thing you notice
              when you pick up a modern smartphone is the display. Nothing
              surprising, because advanced technologies allow you to practically
              level the display frames and cutouts for the front camera and
              speaker, leaving no room for bold design solutions. And how good
              that in such realities Apple everything is fine with displays.
            </p>

            {descriptionExpanded && (
              <p>
                Advanced technologies allow you to practically level the display
                frames and cutouts for the front camera and speaker, leaving no
                room for bold design solutions. And how good that in such
                realities Apple everything.
              </p>
            )}
          </div>

          <button
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span>See More</span>
            {descriptionExpanded ? (
              <IoIosArrowUp size={16} />
            ) : (
              <MdKeyboardArrowDown size={16} />
            )}
          </button>
        </div>

        {/* Specification */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Specification
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-900">
              Sharp FP-J30E-B Air Purifier
            </h3>

            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                GMP Cosmetic Good Manufacturing Practice
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Cruelty Free
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                No Animal Testing
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Zenus Global Standard
              </li>
              {specificationExpanded && (
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Comply with Global Standard
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={() => setSpecificationExpanded(!specificationExpanded)}
            className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span>See More</span>
            {specificationExpanded ? (
              <IoIosArrowUp size={16} />
            ) : (
              <MdKeyboardArrowDown size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
