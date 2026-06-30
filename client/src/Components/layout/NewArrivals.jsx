import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../api/ProductsApi";
import { addToCart } from "../../api/CartApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function NewArrivals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const arrivalProducts = products.slice(0, 8);

  const user = JSON.parse(localStorage.getItem("userINFO"));

  useEffect(() => {
    dispatch(getProducts({ search: "" }));
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    const userId = user?.id || Number(localStorage.getItem("userId"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
          quantity: 1,
        })
      );

      toast.success("Product added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };


  // !user login first //

  const handleCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login"); // Optional
      return;
    }

    const userId = user.id;

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
          quantity: 1,
        })
      );

      toast.success("Product added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };
  return (
    <>
      <div className="container py-5">

        <div className=" mb-5">
          <h2 className="fw-bold">New Arrivals</h2>
          <p className="text-muted">
            Latest premium products added to our store
          </p>
        </div>

        {/* Products */}
        <div className="row">
          {arrivalProducts.length > 0 ? (
            arrivalProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={product.id}
              >
                <div className="card h-100 shadow-sm border-0">
                  {/* Image */}
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : `${BASE_URL}/Allimages/${product.image}`
                    }
                    alt={product.title}
                    width="250"
                    height="250"
                  />

                  <span
                    className="badge bg-danger position-absolute top-0 start-0 m-2"
                  >
                    🔥 Trending
                  </span>
              {product.discount_percent>0 && ( 
                    <span
                      className="badge bg-danger position-absolute top-0 end-0 m-2"
                    >
                      Offer:{product.discount_percent}%Off
                    </span>
                  )}

                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-bold">{product.title}</h6>


                  
                  
                    <div className="d-flex align-items-center gap-2">
                      {product.discount_percent?( 
                      <del className="text-muted">
                        ₹{product.price}
                      </del>
                       ):<span>   ₹{product.price} </span>}
                          
                      {product.discount_percent > 0 &&(
                        <span className="fw-bold fs-5 text-danger">
                          ₹
                          {(
                            product.price -
                            (product.price * product.discount_percent) / 100
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>


                  </div>



                  <div className="card-footer bg-white border-0 d-flex justify-content-between">
                    <Link
                      to={`/productDetails/${product.id}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No Products Found</h5>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default NewArrivals;