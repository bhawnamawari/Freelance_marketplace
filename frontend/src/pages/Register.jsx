import { useForm } from "react-hook-form";
import { register as registerApi } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const {

        register,

        handleSubmit,

    } = useForm();

    const onSubmit = async (data) => {

        try {

            await registerApi(data);

            toast.success("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            toast.error(
                err.response?.data?.message || "Registration Failed"
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

                    Register

                </h1>

                <input
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                />

                <input
                    {...register("phone")}
                    placeholder="Phone"
                    className="w-full border p-3 rounded mb-4"
                />

                <select
                    {...register("role")}
                    className="w-full border p-3 rounded mb-4"
                >

                    <option value="client">

                        Client

                    </option>

                    <option value="freelancer">

                        Freelancer

                    </option>

                </select>

                <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded">

                    Register

                </button>

                <div className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >

                        Login

                    </Link>

                </div>

            </form>

        </div>

    );

}