import React, { useEffect } from "react";

import {useDispatch, useSelector} from "react-redux";
import { getAdminOrder} from "../../api/orderApi";



function AdminDashbord() {

 const orders = useSelector((state) => state.order.adminOrders);
  
  
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAdminOrder());

  },[dispatch]);


  

  const stats = [

    {
      title: "Total Orders",
      value: orders.length,
    },

    {
      title: "Total Amount",
      value: `₹${orders.reduce(
        (sum, item) =>
          sum + Number(item.total),
        0
      )}`,
    },

    {
      title: "Pending Orders",
      value: orders.filter(
        (o) => o.status === "pending"
      ).length,
    },

    {
      title: "Delivered Orders",
      value: orders.filter(
        (o) => o.status === "delivered"
      ).length,
    },
    {
      title: "Processing Orders",
      value: orders.filter(
        (o) => o.status === "processing"
      ).length,
    },
    {
      title: "Shipped Orders",
      value: orders.filter(
        (o) => o.status === "shipped"
      ).length,
    },
    {
      title: "Cancelled Orders",
      value: orders.filter(
        (o) => o.status === "cancelled"
      ).length,
    },

  ];

  

  const recentOrders =
    orders.slice(0, 10);

  return (

    <div className="container-fluid">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      

      <div className="row">

        {stats.map((item, index) => (

          <div
            className="col-md-3 mb-4"
            key={index}
          >

            <div className="card shadow-sm p-3">

              <h5>{item.title}</h5>

              <h3>{item.value}</h3>

            </div>

          </div>

        ))}

      </div>

      

      <div className="card shadow-sm p-4">

        <h4 className="mb-3">
          Recent Orders
        </h4>

        <table className="table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Total</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {recentOrders.map((order) => (

              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>₹{order.total}</td>

                <td>{order.status}</td>    
                   </tr> 
           ))}
           
          </tbody>

        </table>

      </div>

    </div>

  );

}
                

                

              

           

export default AdminDashbord;