const WorkspaceStats = ({ stats }) => {

    return (

        <div className="grid grid-cols-2 gap-4">

            <div className="bg-white rounded-lg shadow p-5">

                <h2 className="text-3xl font-bold">

                    {stats.files}

                </h2>

                <p>Files</p>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <h2 className="text-3xl font-bold">

                    {stats.messages}

                </h2>

                <p>Messages</p>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <h2 className="text-3xl font-bold">

                    {stats.tasks}

                </h2>

                <p>Tasks</p>

            </div>

            <div className="bg-white rounded-lg shadow p-5">

                <h2 className="text-3xl font-bold">

                    {stats.milestones}

                </h2>

                <p>Milestones</p>

            </div>

        </div>

    );

};

export default WorkspaceStats;