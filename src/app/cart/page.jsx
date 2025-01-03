"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { checkout } from "../lib/cartService";
import Toast from "../components/ui/Toast";
import { useOrders } from "../contexts/OrdersContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    CustomerName: "",
    CustomerPhone: "",
    Email: "",
    Address: "",
    City: "",
    Notes: "",
  });

  const { incrementOrdersCount, refreshOrders } = useOrders();

  const [fieldErrors, setFieldErrors] = useState({
    CustomerName: "",
    CustomerPhone: "",
    Email: "",
    Address: "",
    City: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Validate CustomerName
    if (
      formData.CustomerName.length < 2 ||
      formData.CustomerName.length > 100
    ) {
      errors.CustomerName = "يجب أن يكون الاسم بين 2 و 100 حرف";
    }

    // Validate CustomerPhone
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.CustomerPhone)) {
      errors.CustomerPhone = "يجب إدخال رقم هاتف صحيح (10-15 رقم)";
    }

    // Validate Email if provided
    if (formData.Email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        errors.Email = "يرجى إدخال بريد إلكتروني صحيح";
      }
    }

    // Validate Address
    if (formData.Address.length < 5 || formData.Address.length > 500) {
      errors.Address = "يجب أن يكون العنوان بين 5 و 500 حرف";
    }

    // Update field errors state
    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setToastMessage("يرجى تصحيح الأخطاء في النموذج");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await checkout(formData);
      setToastMessage("تم إرسال طلبك بنجاح");
      setToastType("success");
      setShowToast(true);
      updateCart(null);

      // تحديث الطلبات مباشرة
      await refreshOrders();

      router.push("/orders");
    } catch (error) {
      setToastMessage("حدث خطأ أثناء إرسال الطلب");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart?.Items?.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              السلة فارغة
            </h1>
            <p className="text-gray-600 mb-8">
              لم تقم بإضافة أي منتجات إلى السلة بعد
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* تفاصيل السلة */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">محتويات السلة</h2>
            <div className="space-y-4">
              {cart.Items.map((item) => (
                <div
                  key={item.CartItemId}
                  className="flex items-center border-b pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.ProductName}</h3>
                    <p className="text-gray-600">
                      الكمية: {item.Quantity} × {item.Price.toFixed(2)} دينار
                    </p>
                  </div>
                  <span className="font-bold">
                    {item.Total.toFixed(2)} دينار
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold text-lg">
                <span>المجموع الكلي:</span>
                <span>{cart.TotalAmount.toFixed(2)} دينار</span>
              </div>
            </div>
          </div>

          {/* نموذج إتمام الطلب */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">معلومات التوصيل</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="CustomerName"
                  required
                  className={`w-full border rounded-lg px-4 py-2 ${
                    fieldErrors.CustomerName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={formData.CustomerName}
                  onChange={handleChange}
                  minLength={2}
                  maxLength={100}
                />
                {fieldErrors.CustomerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.CustomerName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="CustomerPhone"
                  required
                  className={`w-full border rounded-lg px-4 py-2 ${
                    fieldErrors.CustomerPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={formData.CustomerPhone}
                  onChange={handleChange}
                />
                {fieldErrors.CustomerPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.CustomerPhone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="Email"
                  className={`w-full border rounded-lg px-4 py-2 ${
                    fieldErrors.Email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.Email}
                  onChange={handleChange}
                />
                {fieldErrors.Email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.Email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">العنوان</label>
                <input
                  type="text"
                  name="Address"
                  required
                  className={`w-full border rounded-lg px-4 py-2 ${
                    fieldErrors.Address ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.Address}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={500}
                />
                {fieldErrors.Address && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.Address}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">المدينة</label>
                <input
                  type="text"
                  name="City"
                  required
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.City}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  ملاحظات إضافية
                </label>
                <textarea
                  name="Notes"
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  value={formData.Notes}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-blue-700"
                } transition-colors`}
              >
                {isSubmitting ? "جاري إرسال الطلب..." : "إتمام الطلب"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
