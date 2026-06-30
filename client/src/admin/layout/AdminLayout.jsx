import { Outlet } from "react-router-dom";
import AdminSidebar from "../adminPages/adminComponents/AdminSidebar";




function AdminLayout() {

  return (

    <div className="d-flex">

      <AdminSidebar />

      <div className="w-100">

      

        <div className="p-4">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;