const ProjectFilter = () => {

    return (

        <div className="flex flex-wrap gap-4 mb-8">

            <input
                type="text"
                placeholder="Search Projects"
                className="border p-3 rounded"
            />

            <select className="border p-3 rounded">

                <option>All Categories</option>

                <option>Web Development</option>

                <option>Design</option>

                <option>Marketing</option>

            </select>

            <select className="border p-3 rounded">

                <option>Budget</option>

                <option>₹10K+</option>

                <option>₹50K+</option>

                <option>₹1L+</option>

            </select>

        </div>

    );

};

export default ProjectFilter;