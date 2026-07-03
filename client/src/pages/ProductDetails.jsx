import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../api/ProductsApi";
import { addToCart, getCart } from "../api/CartApi";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const user = useSelector((state) => state.user.user);

  const handleAddToCart = async (product, redirectTo = "/cart") => {
    const userId = user?.id || Number(localStorage.getItem("userId")) || 1;

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
          quantity: 1,
        })
      ).unwrap();

      await dispatch(getCart(userId));
      navigate(redirectTo);
    } catch (err) {
      console.error("Add to cart failed", err);

      const msg = err.response?.data?.message || err.message;

      Swal.fire({
        icon: "error",
        title: "Add to cart failed",
        text: msg,
      });
    }
  };
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">
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

      <h2>{product.title}</h2>
       {product.discount_percent?(  
      <del><h4>₹{product.price}</h4> </del>
      ):<h4>₹{product.price}</h4> }
         
      <p>Stock: {product.stock}</p>
      {product.discount_percent>0 && ( 
                    <span
                      className="badge bg-danger position-absolute top-0 end-0 m-2"
                    >
                      Offer:{product.discount_percent}%Off
                    </span>
                  )}


         <p>Size: {product.size}</p>

            {product.discount_percent>0 && (
             <p className="fw-bold text-danger"> ₹ {( product.price -
    (product.price * product.discount_percent) / 100
              ).toFixed(2)}</p> )}

     <div className="d-flex justify-content-between mt-3 my-3">
  <button
    className="btn btn-primary"
    onClick={() => handleAddToCart(product)}
  >
    Add To Cart
  </button>

  <button
    className="btn btn-success"
    onClick={() => handleAddToCart(product, "/checkout")}
  >
    Proceed to Checkout →
  </button>
</div>
    </div>
  );
}

export default ProductDetails;