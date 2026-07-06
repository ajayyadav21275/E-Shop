import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/LoginApi";
import { Link } from "react-router-dom";

const Register = () => {

  const dispatch = useDispatch()


  const {
    register, handleSubmit, reset, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    dispatch(registerUser({ ...data, role: "User" }));
    reset();
  };
 
  return (
    <div className="bg-info container col-md-4 my-5 rounded-4">

      <div className=" row justify-content-center">

        <h2 className="text-center mb-3 ">
         <i className="bi bi-person-plus me-2"></i> Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value="User" {...register("role")} />

          <input
            className="form-control mb-2"
            placeholder="Name"
            {...register("name", {
              required: "Name required",
            })}
          />

          {
            errors.name && (
              <p className="text-danger">
                {errors.name.message}
              </p>
            )
          }


          <input
            className="form-control mb-2"
            placeholder="Email"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
          />

          {
            errors.email && (
              <p className="text-danger">
                {errors.email.message}
              </p>
            )
          }


          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Min 6 characters",
              },
            })}
          />

          {
            errors.password && (
              <p className="text-danger">
                {errors.password.message}
              </p>
            )
          }   
          <button type="submit" className="btn btn-primary w-100">
            Register Account
          </button>&nbsp;
          <Link to="/login" className="btn btn-outline-primary w-100 mb-4"> Log In Account</Link>

        </form>

      </div>

    </div>
  );
};

export default Register;