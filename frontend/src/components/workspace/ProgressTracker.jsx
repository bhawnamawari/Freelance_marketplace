const ProgressTracker = ({ progress }) => {

    return (

        <div>

            <div className="flex justify-between mb-2">

                <span>Project Progress</span>

                <span>{progress}%</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                />

            </div>

        </div>

    );

};

export default ProgressTracker;