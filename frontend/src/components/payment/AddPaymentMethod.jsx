import { useForm } from "react-hook-form";

const AddPaymentMethod = ({ onSubmit }) => {

    const {
        register,
        handleSubmit
    } = useForm();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <input
                {...register("accountName")}
                placeholder="Account Holder"
                className="w-full border p-3 rounded"
            />

            <input
                {...register("accountNumber")}
                placeholder="Account Number"
                className="w-full border p-3 rounded"
            />

            <input
                {...register("ifsc")}
                placeholder="IFSC Code"
                className="w-full border p-3 rounded"
            />

            <button className="bg-blue-600 text-white px-5 py-3 rounded">

                Add Payment Method

            </button>

        </form>

    );

};

export default AddPaymentMethod;