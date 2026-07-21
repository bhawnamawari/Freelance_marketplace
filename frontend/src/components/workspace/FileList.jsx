import FileCard from "./FileCard";

const FileList = ({ files }) => {

    return (

        <div className="space-y-3">

            {files.map(file=>(

                <FileCard
                    key={file._id}
                    file={file}
                />

            ))}

        </div>

    );

};

export default FileList;