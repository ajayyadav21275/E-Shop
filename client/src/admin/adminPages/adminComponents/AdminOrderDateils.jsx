import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getOrderById } from "../../../api/orderApi";

import { useParams } from "react-router-dom";

function AdminOrderDetails() {

  const { orderId } = useParams();

  const order = useSelector((state) => state.order.currentOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    const oid = orderId 
    if (oid) dispatch(getOrderById(oid));
  }, [dispatch, orderId,]);

  return (

    <div className="container mt-4">

      <h3>Order Details</h3>

      <p>Order ID: {order?.id}</p>

      <p>Customer: {order?.name}</p>

      <p>Total: ₹ {order?.total}</p>

    </div>

  );

}

export default AdminOrderDetails;