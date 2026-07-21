import { useForm } from "react-hook-form";
import Button from "../common/Button";

const ProfileForm = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
    } = useForm();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <input
                {...register("name")}
                placeholder="Name"
                className="w-full border p-3 rounded"
            />

            <input
                {...register("title")}
                placeholder="Professional Title"
                className="w-full border p-3 rounded"
            />

            <textarea
                {...register("bio")}
                rows="5"
                placeholder="Bio"
                className="w-full border p-3 rounded"
            />

            <input
                {...register("hourlyRate")}
                placeholder="Hourly Rate"
                className="w-full border p-3 rounded"
            />

            <Button type="submit">
                Save Profile
            </Button>

        </form>

    );

};

export default ProfileForm;