const FreelancerStats = ({ stats }) => {

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-5 rounded shadow">

                <h2 className="text-3xl font-bold">
                    {stats.projects}
                </h2>

                <p>Projects</p>

            </div>

            <div className="bg-white p-5 rounded shadow">

                <h2 className="text-3xl font-bold">
                    {stats.clients}
                </h2>

                <p>Clients</p>

            </div>

            <div className="bg-white p-5 rounded shadow">

                <h2 className="text-3xl font-bold">
                    {stats.reviews}
                </h2>

                <p>Reviews</p>

            </div>

            <div className="bg-white p-5 rounded shadow">

                <h2 className="text-3xl font-bold">
                    ₹{stats.earnings}
                </h2>

                <p>Earnings</p>

            </div>

        </div>

    );

};

export default FreelancerStats;