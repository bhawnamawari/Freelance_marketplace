const ProfileCard = ({ freelancer }) => {

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <div className="flex items-center gap-6">

                <img
                    src={freelancer.profileImage}
                    alt=""
                    className="w-28 h-28 rounded-full"
                />

                <div>

                    <h2 className="text-3xl font-bold">
                        {freelancer.name}
                    </h2>

                    <p>{freelancer.title}</p>

                    <p className="text-green-600 font-bold mt-2">
                        ₹ {freelancer.hourlyRate}/hour
                    </p>

                </div>

            </div>

            <hr className="my-6"/>

            <h3 className="font-bold mb-3">
                About
            </h3>

            <p>
                {freelancer.bio}
            </p>

        </div>

    );

};

export default ProfileCard;