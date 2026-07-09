import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../api/ProductsApi";
import { addToCart, getCart } from "../api/CartApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { setPage } from "../redux/slice/ProductSlice";
import { getCategoryById } from "../api/categoryApi";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Product = () => {

  const { parentId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, search, page, totalPages } = useSelector((state) => state.products);
  const category = useSelector((state) => state.categories.categoryById);

  const [sortOrder, setSortOrder] = useState("");
  const displayProducts = Array.isArray(products) ? [...products] : [];
  if (sortOrder === "lowToHigh") {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    displayProducts.sort((a, b) => b.price - a.price);
  }


  const userINFO = localStorage.getItem("userINFO")
  const currentUser = userINFO;

  useEffect(() => {
    if (parentId) {
      
      dispatch(getCategoryById({ parentId, page, search }));
      
    } else {
      dispatch(getProducts({ page, search }));
    }
  }, [dispatch, parentId, page, search]);

  const handleAddToCart = async (product) => {
    const userId = currentUser?.id || Number(localStorage.getItem("userId")) || 1;

    try {
      await dispatch(
        addToCart({ userId, productId: product.id, quantity: 1 })
      ).unwrap();
      await dispatch(getCart(userId));
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
      const msg = err.response?.data?.message || err.message;
      const stack = err.response?.data?.stack;
      Swal.fire({ icon: "error", title: "Add to cart failed", text: msg, });
      if (stack) console.error(stack);
    }
  };


  return (

  <>
   




<div className="container mt-4">
  <div className="row">
    {category?.map((item) => (
      <div className="col-md-4 mb-4" key={item.id}>
        <div
          className="card shadow-sm h-100"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/productDetails/${item.id}`)}
        >
          <img
            src={`${BASE_URL}/Allimages/${item.image}`}
            className="card-img-top"
            alt={item.name}
            style={{ height: "220px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>

            <p className="card-text text-muted">
              {item.discription}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    <div className="container py-4">
      <h3 className="mb-3">Featured Products</h3>

      <select
        className="form-select w-auto mb-2"
        value={sortOrder}
        onChange={(e) => { setSortOrder(e.target.value) }}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh">
          Price: Low to High
        </option>
        <option value="highToLow">
          Price: High to Low
        </option>
      </select>
      <div className="row">
        {displayProducts.map((product) => (

          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${BASE_URL}/Allimages/${product.image}`
                }
                alt={product.title}
                width="300"
                height="300"
              />

              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>



                <p className="fw-bold">
                  <del> ₹ Price:{product.price} </del>
                </p>
                <span className="badge bg-success">
                  Offer:{product.discount_percent}% OFF
                </span>
                <p className="fw-bold text-danger">
                  ₹
                  {(
                    product.price -
                    (product.price * product.discount_percent) / 100
                  ).toFixed(2)}
                </p>
                <p className="card-text text-muted">
                  Size:{product.size}
                </p>
                <p>
                  Stock:
                  <span className="badge bg-success ms-2">
                    {product.stock}
                  </span>
                </p>
              </div>

              <div className="card-footer bg-white border-0">
                <div className="card-footer bg-white border-0 d-flex justify-content-between">

                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => handleAddToCart(product)} disabled={!userINFO}
                  >
                    Add To Cart
                  </button>


                  <Link
                    to={`/productDetails/${product.id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>


                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </button>

          <span className="mx-3">{page}</span>

          <button
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  </>
  );
};



export default Product;