const ExperienceCard = ({ experience }) => {

    return (

        <div className="border-l-4 border-blue-600 pl-5 py-3">

            <h3 className="font-bold">

                {experience.position}

            </h3>

            <p>

                {experience.company}

            </p>

            <span className="text-gray-500">

                {experience.startDate} - {experience.endDate}

            </span>

        </div>

    );

};

export default ExperienceCard;