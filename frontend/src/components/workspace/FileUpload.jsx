import { FaUpload } from "react-icons/fa";

const FileUpload = ({ onUpload }) => {

    return (

        <label className="cursor-pointer flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded">

            <FaUpload/>

            Upload File

            <input
                type="file"
                hidden
                onChange={(e)=>onUpload(e.target.files[0])}
            />

        </label>

    );

};

export default FileUpload;