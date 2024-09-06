import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function Login() {
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);

        reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Authentication fails with your email and password",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex w-full items-center justify-center my-10 md:px-5">
      <div className="w-[1000px] flex items-center justify-center px-5">
        <div className="lg:w-1/2 lg:rounded-r-lg max-w-md h-[500px] bg-slate-300 p-8 space-y-3  text-black rounded-t-xl">
          <h1 className="text-2xl font-bold text-center text-violet-600">
            Login Now!
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate=""
            action=""
            className="space-y-6"
          >
            <div className="space-y-1 text-sm">
              <label
                htmlFor="email"
                className="block text-gray-400 dark:text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50  text-black dark:text-gray-800 focus:border-violet-400 focus:dark:border-violet-600"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="password"
                className="block text-gray-400 dark:text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50  text-black dark:text-gray-800 focus:border-violet-400 focus:dark:border-violet-600"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
            <button className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-violet-400 dark:bg-violet-600">
              Login
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-400 dark:text-gray-600">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-700 dark:bg-gray-300"></div>
          </div>
          {/* <SocialLogin /> */}
          <p className="text-xs text-center sm:px-6 text-gray-400 dark:text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              rel="noopener noreferrer"
              href="#"
              className="underline  text-black dark:text-gray-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
