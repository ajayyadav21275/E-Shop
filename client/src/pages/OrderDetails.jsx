import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {getOrderById } from "../api/orderApi";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function OrderDetails() {
    const {orderId} = useParams();
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const order = useSelector((state) => state.order.currentOrder);
    

    useEffect(()=>{
        dispatch(getOrderById(orderId))
    },[dispatch,orderId])
    
  if (!order) {
    return (
      <div className="container py-4">
        <h3>Order not found</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const items = order.items || [];

  return (
    <div className="container py-4">

      <h2 className="mb-4">Order Details</h2>

      {/* Order Info */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Order #{order.id}</h5>

        <p>
          Status:
          <span className="badge bg-warning ms-2">
            {order.status}
          </span>
        </p>

        <p>Total Amount: ₹{order.total}</p>
      </div>

      {/* Address */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Delivery Address</h5>

        <p>{order.name}</p>
        <p>{order.phone}</p>
        <p>{order.address}</p>
        <p>{order.city}</p>
         <p>{order.state}</p>
        <p>{order.pincode}</p>
         <p>{order.country}</p>
      </div>

      {/* Products */}
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Products</h5>

        {items.length === 0 ? (
          <p>No products found</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="row border-bottom py-3"
            >
              <div className="col-md-2">
                <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${BASE_URL}/Allimages/${item.image}`
                    }
                    alt={item.title}
                    width="150"
                    height="150"
                  />
              </div>

              <div className="col-md-10">
                <h6>{item.title}</h6>

                <p>Price: ₹{item.price}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Subtotal: ₹
                  {item.price * item.quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="text-end mt-4">
        <h4>Grand Total: ₹{order.total}</h4>
      </div>

      {/* Back Button */}
      <div className="mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
        </button>
      </div>

    </div>
  );
}

export default OrderDetails;