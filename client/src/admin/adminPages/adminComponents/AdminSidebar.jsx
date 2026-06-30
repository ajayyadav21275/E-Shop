import { NavLink } from "react-router-dom";

function AdminSidebar() {

  return (

    <div
      className="bg-info text-white p-3"
      style={{
        width: "250px",
        height: "100vh"
      }}
    >

      <h3><i> Admin Panel</i> </h3>

      <ul className="list-unstyled">

        <li className="mb-3">
          <NavLink
            to="/admin"
            className="text-dark text-decoration-none"
          >
            Dashboard
          </NavLink>
        </li>

        <li className="mb-3">
          <NavLink
            to="/admin/orders"
            className="text-dark text-decoration-none"
          >
            Orders
          </NavLink>
        </li>

        <li className="mb-3">
          <NavLink
            to="/admin/products"
            className="text-dark text-decoration-none"
          >
            Products
          </NavLink>
        </li>
         <li>
          <NavLink  to= "/admin/category"   className="text-dark text-decoration-none">Categories</NavLink>
         </li>
      </ul>

    </div>

  );

}

export default AdminSidebar;