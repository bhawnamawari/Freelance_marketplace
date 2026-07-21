import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {

    return (

        <div className="space-y-3">

            {tasks.map(task => (

                <TaskCard
                    key={task._id}
                    task={task}
                />

            ))}

        </div>

    );

};

export default TaskList;