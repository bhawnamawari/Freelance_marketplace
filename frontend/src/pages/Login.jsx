import { useForm } from "react-hook-form";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();

    const { login: saveLogin } = useAuth();

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm();

    const onSubmit = async (data) => {

        try {

            const res = await login(data);

            saveLogin(res.data.user, res.data.token);

            toast.success("Login Successful");

            navigate("/dashboard");

        }

        catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input
                    {...register("email", {
                        required: "Email Required",
                    })}
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-3"
                />

                <p className="text-red-500">
                    {errors.email?.message}
                </p>

                <input
                    type="password"
                    {...register("password", {
                        required: "Password Required",
                    })}
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-3"
                />

                <p className="text-red-500">
                    {errors.password?.message}
                </p>

                <button className="w-full bg-blue-600 text-white py-3 rounded">

                    Login

                </button>

                <div className="text-center mt-5">

                    Don't have an account?

                    <Link
                        className="text-blue-600 ml-2"
                        to="/register"
                    >
                        Register
                    </Link>

                </div>

            </form>

        </div>

    );

}