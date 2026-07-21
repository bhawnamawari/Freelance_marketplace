const TaskCard = ({ task }) => {

    return (

        <div className="bg-white shadow rounded-lg p-4">

            <h3 className="font-bold">{task.title}</h3>

            <p>{task.description}</p>

            <span className="text-blue-600">{task.status}</span>

        </div>

    );

};

export default TaskCard;