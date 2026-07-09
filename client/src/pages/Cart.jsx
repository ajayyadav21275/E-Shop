import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeCart,
  updateCart,
} from "../api/CartApi";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
    
  // const savedUser = JSON.parse(localStorage.getItem("userINFO") || "null");
  const currentUser = user;
  const userId = currentUser?.id ?? Number(localStorage.getItem("userId")) ?? 1;

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  const total = cartItems.reduce((sum, item) => {
  const finalPrice =
    item.price - (item.price * item.discount_percent) / 100;

  return sum + finalPrice * item.quantity;
  

}, 0);
  
  return (
    <div className="container py-4">
      <h2 className="mb-4">Cart Page</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Cart is empty 🛒</p>
      ) : (
        <>
          {/* PRODUCTS GRID */}
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">

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

                  <div className="card-body">
                    <h5>{item.title}</h5>
                    <p className="fw-bold text-danger">
                      ₹
                      {(
                        item.price -
                        (item.price * item.discount_percent) / 100
                      ).toFixed(2)}
                    </p>



                    <p>
                      Stock:
                      <span className="badge bg-success ms-2">
                        {item.stock}
                      </span>
                    </p>
                  

                    {/* QUANTITY */}
                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              id: item.id,
                              quantity: Number(item.quantity) - 1,
                            })
                          )
                        }
                      >
                        -
                      </button>

                      <span className="mx-3">
                        {item.quantity}
                      </span>
                        
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              id: item.id,
                              quantity: Number(item.quantity) + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() =>
                        dispatch(removeCart(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM BAR */}
          <div className="d-flex justify-content-between align-items-center mt-4 p-3 border rounded shadow-sm">

            {/* LEFT SIDE */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/product")}
            >
              ← Continue Shopping
            </button>

            {/* RIGHT SIDE */}
            <div className="text-end">
              <h5 className="mb-2">
                Grand Total: ₹{total}
              </h5>

              <button
                className="btn btn-success"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;