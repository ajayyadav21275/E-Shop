import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { logIn } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
 const dispatch= useDispatch();
 const navigate = useNavigate();
const user= useSelector((state)=>state.user.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(logIn(data)).unwrap();
      
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "LogIn successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      if (result?.token) {

  if (result?.user?.role === "Admin") {

    navigate("/admin");

  } else if (result?.user?.role === "User") {

    navigate("/");

  }

} else {

  navigate("/login");

}
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error?.message || "Login failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  

  return (
    <div className=" container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className=" bg-info card shadow p-4 rounded-4">

            <h2 className="text-center mb-4">
             <i className="bi bi-box-arrow-in-right me-2"></i> Login
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>

            
              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className={`form-control ${
                    errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter Email"
                  {...register("email", {
                    required:
                      "Email is required",

                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,

                      message:
                        "Invalid Email",
                    },
                  })}
                />

                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className={`form-control ${
                    errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter Password"
                  {...register("password", {
                    required:
                      "Password is required",

                    minLength: {
                      value: 6,

                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                />

                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              
            

              
              <button
                type="submit"
                className="btn btn-primary w-100"             
              >
             Log in
              </button>&nbsp;
              <Link to="/register" className="btn btn-outline-primary w-100"> Register Account</Link>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;