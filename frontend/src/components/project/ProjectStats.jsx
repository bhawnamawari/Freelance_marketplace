const ProjectStats = ({ stats }) => {

    return (

        <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-3xl font-bold">

                    {stats.total}

                </h2>

                <p>Total Projects</p>

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-3xl font-bold">

                    {stats.open}

                </h2>

                <p>Open</p>

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-3xl font-bold">

                    {stats.completed}

                </h2>

                <p>Completed</p>

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-3xl font-bold">

                    ₹ {stats.earnings}

                </h2>

                <p>Earnings</p>

            </div>

        </div>

    );

};

export default ProjectStats;