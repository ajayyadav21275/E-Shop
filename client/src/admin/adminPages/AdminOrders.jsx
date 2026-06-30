import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrder, updateOrder } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

 const BASE_URL = import.meta.env.VITE_BASE_URL;
function AdminOrders() {
const navigate = useNavigate();
  const orders = useSelector((state) => state.order.adminOrders);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminOrder());
  }, [dispatch]);

  
  const columns = [

    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: "Customer",
      selector: (row) => row.user_name,
    },

    {
      name: "Delivery Name",
      selector: (row) => row.delivery_name,
    },

    {
      name: "Total",
      selector: (row) => `₹ ${row.total}`,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) =>
       <select value={row.status} onChange={(e)=>{dispatch( updateOrder({id: row.id, status: e.target.value }))}}>
        
          
            <option value="pending">pending</option>
               <option value="processing">
        Processing
      </option>

      <option value="shipped">
        Shipped
      </option>

      <option value="delivered">
        Delivered
      </option>

      <option value="cancelled">
        Cancelled
      </option>
      </select>  
      
    },

    {
      name: "Products",
      cell: (row) => (

        <div>

          {row.items?.map((item, index) => (

            <div
              key={index}
              className="mb-2 border p-2 rounded"
            >

             <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${BASE_URL}/Allimages/${item.image}`
                    }
                    alt={item.title}
                    width="80"
                    height="80"
                  />

              <p className="mb-0">
                {item.title}
              </p>

              <small>
                Qty: {item.quantity}
              </small>

               <small>
                Price: {item.price}
              </small>

            </div>

          ))}

        </div>

      ),
    },
    {
      name: "View Details",
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/orderDetails/${row.id}`)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (

    <div className="container mt-4">

      <h3 className="mb-4">All Orders</h3>

      <DataTable
        columns={columns}
        data={orders}
        pagination
        highlightOnHover
        striped
        responsive
      />

    </div>

  );

}

export default AdminOrders;