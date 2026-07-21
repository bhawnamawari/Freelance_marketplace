import { FaWallet } from "react-icons/fa";

const WalletCard = ({ balance }) => {

    return (

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">

            <FaWallet className="text-5xl"/>

            <h2 className="mt-5 text-xl">

                Wallet Balance

            </h2>

            <p className="text-4xl font-bold mt-3">

                ₹ {balance}

            </p>

        </div>

    );

};

export default WalletCard;