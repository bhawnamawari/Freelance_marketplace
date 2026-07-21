import { useForm } from "react-hook-form";

const WithdrawForm = ({ onSubmit }) => {

    const {
        register,
        handleSubmit
    } = useForm();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow p-6 space-y-5"
        >

            <input
                {...register("amount")}
                placeholder="Withdraw Amount"
                className="w-full border rounded p-3"
            />

            <select
                {...register("method")}
                className="w-full border rounded p-3"
            >

                <option>Bank Account</option>

                <option>UPI</option>

                <option>PayPal</option>

            </select>

            <button className="bg-green-600 text-white px-6 py-3 rounded">

                Withdraw

            </button>

        </form>

    );

};

export default WithdrawForm;