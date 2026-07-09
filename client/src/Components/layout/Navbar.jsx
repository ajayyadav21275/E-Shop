import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/slice/ProductSlice";
import Swal from "sweetalert2";
import { logoutUser } from "../../redux/slice/LoginSlice";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const Navbar = () => {
const category = useSelector((state)=>state.categories.categories);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userINFO"));

  const currentUser = user;

  const isAdmin =
    currentUser?.role === "Admin";

  // LOGOUT

  const handleLogout = () => {

    Swal.fire({
      title: "Logout?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes"
    }).then((result) => {

      if (result.isConfirmed) {

        localStorage.removeItem("token");
        localStorage.removeItem("userINFO");
        localStorage.removeItem("userId");

        dispatch(logoutUser());
      
        navigate("/login")

      }

    });

  };

  return (

    <nav
      className="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-3"
      style={{
        zIndex: 1000
      }}
    >

      <div className="container">

        {/* LOGO */}

        <NavLink
          to="/"
          className="navbar-brand fw-bold fs-2"
        >

          <span className="text-primary">
            E
          </span>

          <span className="text-dark">
            Shop
          </span>

        </NavLink>

        

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >

          <i className="bi bi-list fs-2"></i>

        </button>

        {/* NAVBAR */}

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          {/* SEARCH */}

          {!isAdmin && (

            <div className="mx-auto w-50 d-none d-lg-block">

              <div
                className="input-group bg-light rounded-pill overflow-hidden px-2"
              >

                <span className="input-group-text bg-light border-0">

                  <i className="bi bi-search text-muted"></i>

                </span>

                <input
                  type="text"
                  className="form-control border-0 bg-light shadow-none"
                  placeholder="Search for products..."
                  onChange={(e) =>
                    dispatch(setSearch(e.target.value.toLowerCase()))
                  }
                />

              </div>

            </div>

          )}

        

          <div className="ms-auto d-flex align-items-center gap-4 mt-4 mt-lg-0">

            {/* USER NAVBAR */}

            {!isAdmin && (
              <>

                <NavLink
                  to="/"
                 className={({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  }
                >
                  Home
                </NavLink>

                

              <div className="dropdown">

  <button
    className="btn border-0 fw-semibold dropdown-toggle"
    data-bs-toggle="dropdown"
  >
    Categories
  </button>

 <ul className="dropdown-menu">

  {category?.map((item) => (

    <li key={item.id}>

      <NavLink
        className="dropdown-item"
        to={`/product/${item.id}`}
      >
        {item.name}
      </NavLink>

    </li>

  ))}

</ul>

</div> 
        <NavLink  to="/product"  className={({ isActive }) =>isActive? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  } >Products</NavLink>

      <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-primary" : "text-dark"}              >

                  <i className="bi bi-heart fs-4"></i>

                </NavLink>

                <NavLink
                  to="/cart"
                   className={({ isActive }) =>
    isActive ? "text-primary" : "text-dark"
  }
                >

                  <i className="bi bi-cart3 fs-4"></i>

                </NavLink>

              </>
            )}

            

            {isAdmin && (
              <>

                <NavLink
                  to="/admin"
                 className={({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/admin/orders"
                   className={({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  }
                >
                  Orders
                </NavLink>
                  <NavLink
                  to="/admin/category"
                   className={({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-primary border-bottom border-2 border-primary"
      : "nav-link fw-semibold text-dark"
  }
                >
                  Category
                </NavLink>

              </>
            )}

            

           {currentUser ? (
  <div className="dropdown">
    <button
      className="btn btn-primary rounded-pill dropdown-toggle"
      data-bs-toggle="dropdown"
    >
      <i className="bi bi-person-circle me-2"></i>
      {currentUser.name}
    </button>

    <ul className="dropdown-menu dropdown-menu-end">

      <li>
        <NavLink className="dropdown-item" to="/profile">
          <i className="bi bi-person me-2"></i>
          My Profile
        </NavLink>
      </li>

      <li>
        <NavLink className="dropdown-item" to= "/orders">
          <i className="bi bi-box-seam me-2"></i>
          My Orders
        </NavLink>
      </li>

      <li>
        <NavLink className="dropdown-item" to="/address">
          <i className="bi bi-geo-alt me-2"></i>
          My Address
        </NavLink>
      </li>

      <li><hr className="dropdown-divider" /></li>

      <li>
        <button
          className="dropdown-item text-danger"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </li>

    </ul>
  </div>
) : (
  <NavLink
    to="/login"
    className="btn btn-primary rounded-pill px-4"
  >
    <i className="bi bi-person me-2"></i>
    Login
  </NavLink>
)}

          </div>

        </div>

      </div>

    </nav>

  );
};

export default Navbar;