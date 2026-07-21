const PortfolioCard = ({ item }) => {

    return (

        <div className="bg-white rounded-xl shadow">

            <img
                src={item.image}
                alt=""
                className="rounded-t-xl w-full h-56 object-cover"
            />

            <div className="p-5">

                <h3 className="font-bold text-xl">
                    {item.title}
                </h3>

                <p className="mt-3 text-gray-500">
                    {item.description}
                </p>

            </div>

        </div>

    );

};

export default PortfolioCard;