const CertificateCard = ({ certificate }) => {

    return (

        <div className="bg-white rounded-lg shadow p-5">

            <h3 className="font-bold">
                {certificate.name}
            </h3>

            <p className="text-gray-500 mt-2">
                {certificate.organization}
            </p>

            <p className="text-sm mt-2">
                {certificate.issueDate}
            </p>

        </div>

    );

};

export default CertificateCard;