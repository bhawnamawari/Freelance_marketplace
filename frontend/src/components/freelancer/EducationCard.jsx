const EducationCard = ({ education }) => {

    return (

        <div className="bg-white rounded-lg shadow p-5">

            <h3 className="font-bold">

                {education.degree}

            </h3>

            <p>

                {education.college}

            </p>

            <span className="text-gray-500">

                {education.year}

            </span>

        </div>

    );

};

export default EducationCard;