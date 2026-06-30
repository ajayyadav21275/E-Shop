import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, categoryUpdate, deleteCategory, getCategories } from "../../api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Swal from "sweetalert2";
function AdminCategoryList() {
  const dispatch = useDispatch();

  const categories =
    useSelector((state) => state.categories.categories) || [];

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const [showForm, setShowForm] = useState(false);

  const SubmitHandle = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug.toLowerCase());
    formData.append("description", data.description);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    // UPDATE
    if (editId) {
      await dispatch(
        categoryUpdate({
          id: editId,
          data: formData,
        })
      ).unwrap();

      toast.success("Category Updated Successfully");
    }

    // ADD
    else {
      await dispatch(addCategory(formData)).unwrap();

      toast.success("Category Added Successfully");
    }

    reset();
    setEditId(null);
    setShowForm(false);

    dispatch(getCategories());

  } catch (error) {
    console.log(error);
    toast.error("Operation Failed");
  }
};

  // Category Delete //

 

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Deleting this category will also delete all products associated with it.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteCategory(id));

      Swal.fire({
        title: "Deleted!",
        text: "Category and related products deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete category.",
        icon: "error",
      });
    }
  }
};
   // HANDLE UPDATE //

   const [editId, setEditId] = useState(null);
   const handleUpdate = async(item)=>{
      setEditId(item.id)
      setValue("name", item.name)
      setValue("slug", item.slug)
      setValue("description", item.description)
        setShowForm(true)
      
   }
  return (
    <div className="container-fluid">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
      />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i>Categories</i>
        </h3>

        <button
          className="btn btn-info"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(SubmitHandle)}
          className="card shadow-sm p-4 mb-4"
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                Category Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Category Name"
                {...register("name", {
                  required: "Please Enter The Name"
                })}
              />

              <small className="text-danger">
                {errors.name?.message}
              </small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Slug
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Slug"
                {...register("slug", {
                  required: "Please Enter The Slug"
                })}
              />

              <small className="text-danger">
                {errors.slug?.message}
              </small>
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                rows="3"
                className="form-control"
                placeholder="Description"
                {...register("description", {
                  required: "Please Enter The Description"
                })}
              />

              <small className="text-danger">
                {errors.description?.message}
              </small>
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">
                Category Image
              </label>

              <input
                type="file"
                className="form-control"
                {...register("image")}
              />

              <small className="text-danger">
                {errors.image?.message}
              </small>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
          {editId?"Update Category":"Save Category"}
          </button>
        </form>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Image</th>
                <th width="180">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.description}</td>

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

                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handleUpdate(item)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-muted"
                  >
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryList;