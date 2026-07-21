import { useForm } from "react-hook-form";
import Button from "../common/Button";

const ProjectForm = ({ onSubmit }) => {

    const {

        register,

        handleSubmit,

    } = useForm();

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-xl shadow space-y-5"
        >

            <input

                {...register("title")}

                placeholder="Project Title"

                className="w-full border p-3 rounded"

            />

            <textarea

                {...register("description")}

                rows="5"

                placeholder="Project Description"

                className="w-full border p-3 rounded"

            />

            <input

                {...register("budget")}

                type="number"

                placeholder="Budget"

                className="w-full border p-3 rounded"

            />

            <input

                {...register("deadline")}

                type="date"

                className="w-full border p-3 rounded"

            />

            <select

                {...register("category")}

                className="w-full border p-3 rounded"
            >

                <option>Web Development</option>

                <option>Graphic Design</option>

                <option>Content Writing</option>

                <option>Digital Marketing</option>

            </select>

            <Button type="submit">

                Create Project

            </Button>

        </form>

    );

};

export default ProjectForm;