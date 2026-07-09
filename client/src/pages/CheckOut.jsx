import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../api/CartApi";
import { addToOrder, razorpayOrder, razorpayVerifyPayment } from "../api/orderApi";
import { addAddress } from "../api/addressApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 const BASE_URL = import.meta.env.VITE_BASE_URL;

 
function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const user = useSelector((state) => state.user.user);
  const storedUser = JSON.parse(localStorage.getItem("userINFO") || "null");
  const currentUser = user ?? storedUser;
    
  const userId = currentUser?.id ?? Number(localStorage.getItem("userId")) ?? null;
   const token = currentUser?.token?? localStorage.getItem("token")
   
  //  ADDRESS STATE
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state:"",
    pincode: "",
    country:"",
  });

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  const total = cartItems.reduce(
    (sum, item) => {
      const finalPrice = item.price - (item.price * item.discount_percent) / 100;
      return sum + finalPrice * item.quantity;
    },
    0
  );

  
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  
  };

  const handleSaveAddress = async () => {
    if (!currentUser) {
    
      toast.error("Please login to save address.");
      navigate("/login");
      return null;
    }

    try {
      const res = await dispatch(addAddress({ ...address, user_id: userId })).unwrap();
      const savedAddressId = res?.address_id ?? res?.id ?? null;
      toast.success("Address Saved");
      return savedAddressId;
    } catch (err) {
      console.error("Save address failed:", err);
      toast.error(err?.message || "Address save failed. Please try again.");
      return null;
    }
  };

  const handlePlaceOrder = async (addressId, paymentInfo = {}) => {
    if (!currentUser) {
      toast.error("Please login first to place an order.");
      navigate("/login");
      return;
    }

    const orderData = {
      user_id: userId,
      address_id: addressId,
      payment_Method: paymentMethod,
      razorpay_order_id: paymentInfo.razorpay_order_id || null,
      razorpay_payment_id: paymentInfo.razorpay_payment_id || null,
      razorpay_signature: paymentInfo.razorpay_signature || null,
      items: cartItems.map((item) => ({
        product_id: item.product_id || item.id,
        quantity: item.quantity,
        price: Number(item.price) || 0,
      })),
      total: Number(total) || 0,
      address,
    };

    try {
      await dispatch(addToOrder(orderData)).unwrap();
      toast.success("Order placed successfully 🎉");
     
       
    } catch (err) {
      console.error("Order failed:", err);
      toast.error(err?.message || "Order failed. Please try again.");
    }
  };

  const handleCheckout = async () => {
  const addressId = await handleSaveAddress();

  if (!addressId) return;

  if (paymentMethod === "cod") {
    await handlePlaceOrder(addressId);
    navigate("/orders");
  } else {
    await openRazorpay({ addressId });
  }
};

const [paymentMethod, setPaymentMethod] = useState("razorpay")

// open razorpay//


const openRazorpay = async ({addressId,paymentResponse=null}) => {
  try {
    const data = await dispatch(razorpayOrder(total)).unwrap();

    const order = data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "E-Commerce",

      description: "Order Payment",

      prefill: {
        name: address.name,
        contact: address.phone,
      },

      handler: async function (response) {
        
        const verify = await dispatch(
          razorpayVerifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
        ).unwrap();

        if (verify.success) {
          await handlePlaceOrder(addressId, response);
          toast.success("Payment Successful 🎉");
          navigate("/orders");
        } else {
          toast.error("Payment Verification Failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  } catch (err) {
    console.log(err);

    toast.error("Payment Failed");
  }
};
  return (
    <div className="container py-4">
      <h2 className="mb-4">Checkout Page</h2>

      {/* CART ITEMS */}
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card p-2">

               <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${BASE_URL}/Allimages/${item.image}`
                    }
                    alt={item.title}
                    width="250"
                    height="250"
                  />
              
              <h5>{item.title}</h5>
                <p className="fw-bold text-danger">
                      ₹
                      {(
                        item.price -
                        (item.price * item.discount_percent) / 100
                      ).toFixed(2)}
                    </p>
              <p>Qty: {item.quantity}</p>
              <p>
                Subtotal: ₹
                 {(
                        item.price -
                        (item.price * item.discount_percent) / 100
                      ).toFixed(2)*item.quantity}
              </p>

            </div>
          </div>
        ))}
      </div>

      
     {/* ADDRESS FORM */}
<div className="card p-3 mt-4">
  <h4>Delivery Address</h4>

  <input
    className="form-control my-2"
    placeholder="Name"
    name="name"
    value={address.name}
    onChange={handleChange}
  />

  <input
    className="form-control my-2"
    placeholder="Phone"
    name="phone"
    value={address.phone}
    onChange={handleChange}
  />

  <input
    className="form-control my-2"
    placeholder="Address"
    name="address"
    value={address.address}
    onChange={handleChange}
  />

  <input
    className="form-control my-2"
    placeholder="City"
    name="city"
    value={address.city}
    onChange={handleChange}
  />

  
  <input
    className="form-control my-2"
    placeholder="State"
    name="state"
    value={address.state}
    onChange={handleChange}
  />

  <input
    className="form-control my-2"
    placeholder="Pincode"
    name="pincode"
    value={address.pincode}
    onChange={handleChange}
  />


  <input
    className="form-control my-2"
    placeholder="Country"
    name="country"
    value={address.country}
    onChange={handleChange}
  />
</div>
<div className="card p-3 mt-4">
  <h4>Payment Method</h4>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="razorpay"
      checked={paymentMethod === "razorpay"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label className="form-check-label">
      Razorpay (UPI / Card / Net Banking)
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="paymentMethod"
      value="cod"
      checked={paymentMethod === "cod"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <label className="form-check-label">
      Cash On Delivery
    </label>
  </div>
</div>


      {/* TOTAL + BUTTON */}
      <div className="text-end mt-4">
        <h3>Grand Total: ₹{total}</h3>

        <button className="btn btn-success mt-2" onClick={handleCheckout}>
          Place Order
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default CheckOut;