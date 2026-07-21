import { useForm } from "react-hook-form";
import Button from "../common/Button";

const BidForm = ({ onSubmit }) => {

    const {

        register,

        handleSubmit,

    } = useForm();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <textarea

                {...register("proposal")}

                placeholder="Write Proposal"

                rows="5"

                className="w-full border p-3 rounded"

            />

            <input

                {...register("amount")}

                placeholder="Bid Amount"

                className="w-full border p-3 rounded"

            />

            <input

                {...register("days")}

                placeholder="Delivery Days"

                className="w-full border p-3 rounded"

            />

            <Button type="submit">

                Submit Proposal

            </Button>

        </form>

    );

};

export default BidForm;