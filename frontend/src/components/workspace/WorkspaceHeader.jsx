import { FaUserCircle, FaCircle } from "react-icons/fa";

const WorkspaceHeader = ({ workspace }) => {
    return (
        <div className="bg-white shadow rounded-xl p-5 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold">
                    {workspace.projectTitle}
                </h2>

                <p className="text-gray-500">
                    Client : {workspace.clientName}
                </p>

            </div>

            <div className="flex items-center gap-4">

                <FaUserCircle className="text-4xl"/>

                <div>

                    <h3>{workspace.freelancerName}</h3>

                    <div className="flex items-center gap-2 text-green-600">

                        <FaCircle size={10}/>

                        Online

                    </div>

                </div>

            </div>

        </div>
    );
};

export default WorkspaceHeader;