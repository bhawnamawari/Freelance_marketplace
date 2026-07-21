const AvailabilityBadge = ({ available }) => {

    return available ? (

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

            Available

        </span>

    ) : (

        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">

            Busy

        </span>

    );

};

export default AvailabilityBadge;