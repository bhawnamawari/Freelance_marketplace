import { FaFileAlt, FaDownload } from "react-icons/fa";

const FileCard = ({ file }) => {

    return (

        <div className="bg-white rounded-lg shadow p-4 flex justify-between">

            <div className="flex items-center gap-3">

                <FaFileAlt/>

                <div>

                    <h4>{file.name}</h4>

                    <small>{file.size}</small>

                </div>

            </div>

            <button>

                <FaDownload/>

            </button>

        </div>

    );

};

export default FileCard;