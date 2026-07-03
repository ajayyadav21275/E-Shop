import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.order.orders);
 

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (userId) {
      dispatch(getOrder(userId));
    }
  }, [dispatch, userId]);
  
  return (
    <div className="container py-4">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h5>Order #{order.id}</h5>

            <p>Total Amount: ₹{order.total}</p>

            <p>
              Order-Status:
              <span className="badge bg-warning ms-2">
                {order.status}
              </span>
            </p>
            <p>
              Payment-Status:
              <span className="badge bg-warning ms-2">
                {order.payment_status}
              </span>
            </p>

             

            <button className="btn btn-primary" onClick={()=>navigate(`/orderDetails/${order.id}`)}>
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;