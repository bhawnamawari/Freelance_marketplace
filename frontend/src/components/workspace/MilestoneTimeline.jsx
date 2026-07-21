import MilestoneCard from "./MilestoneCard";

const MilestoneTimeline = ({ milestones }) => {

    return (

        <div className="space-y-4">

            {milestones.map(item=>(

                <MilestoneCard
                    key={item._id}
                    milestone={item}
                />

            ))}

        </div>

    );

};

export default MilestoneTimeline;