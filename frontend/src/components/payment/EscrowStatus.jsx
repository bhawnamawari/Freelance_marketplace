const EscrowStatus = ({ status }) => {

    const colors = {

        pending: "bg-yellow-100 text-yellow-700",

        funded: "bg-blue-100 text-blue-700",

        released: "bg-green-100 text-green-700",

        disputed: "bg-red-100 text-red-700",

    };

    return (

        <span className={`px-4 py-2 rounded-full ${colors[status]}`}>

            {status}

        </span>

    );

};

export default EscrowStatus;