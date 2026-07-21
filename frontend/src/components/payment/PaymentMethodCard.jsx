const PaymentMethodCard = ({ method }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h3 className="font-bold">

                {method.type}

            </h3>

            <p className="mt-2">

                {method.account}

            </p>

            <span className="text-green-600">

                {method.default ? "Default" : ""}

            </span>

        </div>

    );

};

export default PaymentMethodCard;