import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../api/ProductsApi";
import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCategories } from "../../api/categoryApi";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { setSearch } from "../../redux/slice/ProductSlice";

function AdminProducts() {
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const products = useSelector((state) => state.products.products);

  const category = useSelector((state) => state.categories.categories);
  const search = useSelector((state) => state.products.search);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    dispatch(getProducts({ page: 1, search }));
    dispatch(getCategories())
  }, [dispatch, search]);

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category_id", data.category_id);
    formData.append("color", data.color);
    formData.append("size", data.size);
    formData.append("discount_percent", data.discount_percent)

    formData.append("status", data.status ? "true" : "false");
    if (data.image && data.image[0]) formData.append("image", data.image[0]);

    if (editId) {
      await dispatch(updateProduct({ id: editId, data: formData }));
      toast.success("Product update successfully!");
      setEditId(null)
      reset();
      setShowForm(false)
      dispatch(getProducts({ page: 1, search: "" }));
    }
    else {
      for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
      await dispatch(addProduct(formData));
      console.log("dispatch",dispatch)
      toast.success("Product added successfully!");
      reset();
      setShowForm(false);
      dispatch(getProducts({ page: 1, search: "" }));

    }

  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct({ id })).unwrap();

      toast.success("Product Deleted Successfully");

      dispatch(getProducts({ page: 1, search: "" }));
    } catch (error) {
      console.log(error);

      toast.error("Failed To Delete Product");
    }
  };

  const handleEdit = (item) => {

    setEditId(item.id)

    setValue("title", item.title);
    setValue("price", item.price);
    setValue("stock", item.stock);
    setValue("category_id", item.category_id);
    setValue("color", item.color || "");
    setValue("size", item.size || "");
    setValue("discount_percent", item.discount_percent)

    setShowForm(true)
  }

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Products</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="card shadow-sm p-4 mb-4">
          <h4 className="mb-4">Add Product</h4>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Product Title</label>
                <input type="text" className="form-control" placeholder="Enter product title" {...register("title")} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" placeholder="Enter price" {...register("price")} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" placeholder="Enter stock" {...register("stock")} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Colour</label>
                <input type="text" className="form-control" placeholder="Enter Colour" {...register("color")} />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Size</label>
                <input type="text" className="form-control" placeholder="Enter Size" {...register("size")} />

              </div>
               <div className="col-md-4 mb-3">
                <label className="form-label">discount_percent</label>
                <input type="number" className="form-control" placeholder="Enter discount_percent" {...register("discount_percent")} />

              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Category</label>

                <select
                  className="form-control"
                  {...register("category_id", {
                    required: "Please Select Category",
                  })}
                >
                  <option value="">Select Category</option>

                  {category.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>


              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Product Image</label>
                <input type="file" className="form-control" {...register("image")} />
              </div>


              <div className="col-12 mb-4">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="statusToggle" {...register("status")} />
                  <label className="form-check-label" htmlFor="statusToggle">Active Product</label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">{editId ? "Update Product" : "Save Product"}</button>
          </form>
        </div>
      )}

      <div className="card shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Product List</h4>
          <input type="text" className="form-control w-25" placeholder="Search Product" onChange={(e) =>
            dispatch(setSearch(e.target.value.toLowerCase()))
          } />

        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>category_Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Size</th>
                <th>discount_percent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={
                          item.image?.startsWith("http")
                            ? item.image
                            : `${BASE_URL}/Allimages/${item.image}`
                        }
                        alt={item.title}
                        width="60"
                        height="60"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category_name || category.find((cat) => cat.id === item.category_id)?.name || "-"}</td>
                    <td>₹{item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.size}</td>
                    <td>{item.discount_percent}</td>
                    <td>{item.stock > 0 ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Out Of Stock</span>}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">No Products Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;