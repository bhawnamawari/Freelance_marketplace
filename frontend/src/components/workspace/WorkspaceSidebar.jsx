import ProgressTracker from "./ProgressTracker";

const WorkspaceSidebar = ({ workspace }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5 space-y-6">

            <ProgressTracker progress={workspace.progress}/>

            <div>

                <h3 className="font-bold mb-2">
                    Budget
                </h3>

                ₹ {workspace.budget}

            </div>

            <div>

                <h3 className="font-bold mb-2">
                    Deadline
                </h3>

                {workspace.deadline}

            </div>

        </div>

    );

};

export default WorkspaceSidebar;