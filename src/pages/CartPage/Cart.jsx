import { useContext, useState, useEffect } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, clearCart, updateCart } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    setItems(cart.map((item) => ({ ...item, selected: false })));
  }, [cart]);

  const toggleItemSelection = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    setItems((prev) => prev.map((item) => ({ ...item, selected: newState })));
  };

  const handleClearSelected = () => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: false })));
    setSelectAll(false);
  };

  const handleRemoveItem = (id) => {
    const updated = items.filter((item) => item.product.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = items.map((item) =>
      item.product.id === id ? { ...item, quantity: newQty } : item
    );
    setItems(updated);
    updateCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const selectedItems = items.filter((item) => item.selected);

  // const totalPrice = selectedItems.reduce(
  //   (sum, item) =>
  //     sum + parseFloat(item.selectedColor.discount_price) * item.quantity,
  //   0
  // );

  const totalPrice = selectedItems.reduce((sum, item) => {
    const variation = item.product.variations.find(
      (v) => v.barcode === item.selectedVariant
    );
    const price = parseFloat(variation?.discount_price || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
          <span>Home</span>
          <MdKeyboardArrowRight className="w-4 h-4 mx-2" />
          <span>My Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  My Cart ({items.length})
                </h1>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                    Select All
                  </label>
                  <button
                    onClick={handleClearSelected}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {items.map((item, index) => (
                <div key={index} className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleItemSelection(item.product.id)}
                      className="self-start rounded border-gray-300"
                    />
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                      <img
                        src={item.product.image[1].url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Variant: {item.selectedVariant?.name || "Default"}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-50"
                          >
                            <FaMinus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.quantity.toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-50"
                          >
                            <FaPlus className="w-4 h-4" />
                          </button>
                        </div>
                        {/* <div className="text-center">
                          <div className="font-semibold text-gray-900">
                            <span className="text-2xl">৳ </span>
                            {item.selectedColor.discount_price}
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="line-through">
                              ৳ {item.selectedColor.regular_price}
                            </span>
                          </div>
                        </div> */}
                        {/* Price */}
                        <div className="text-center">
                          {(() => {
                            const selectedVariation =
                              item.product.variations.find(
                                (v) => v.barcode === item.selectedVariant
                              );
                            const discountPrice =
                              selectedVariation?.discount_price || "0.00";
                            const regularPrice =
                              selectedVariation?.regular_price || "0.00";

                            return (
                              <>
                                <div className="font-semibold text-gray-900">
                                  <span className="text-2xl">৳ </span>
                                  {parseFloat(discountPrice).toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400">
                                  <span className="line-through">
                                    ৳{" "}
                                    {parseFloat(regularPrice).toLocaleString()}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <FaRegTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h2 className="font-semibold text-gray-900 mb-4">
                Order summary
              </h2>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Price ({selectedItems.length} items)
                  </span>
                  <span>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping fee</span>
                  <span className="text-blue-600 text-xs">To be added</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Store / Falcon coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600">
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-3 mb-4">
                <div className="flex justify-between font-semibold">
                  <span>Sub Total</span>
                  <span>৳{totalPrice}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded font-medium mb-4 ${
                  selectedItems.length === 0 || !agreedToTerms
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={selectedItems.length === 0 || !agreedToTerms}
                onClick={() => {
                  if (selectedItems.length > 0 && agreedToTerms) {
                    clearCart();
                    setItems([]);
                    localStorage.removeItem("cart");
                  }
                }}
              >
                Proceed to Checkout
              </button>

              <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span>
                  I agree to the Terms, Privacy Policy and Return Policy.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
