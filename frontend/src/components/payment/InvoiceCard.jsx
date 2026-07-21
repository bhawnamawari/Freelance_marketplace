const InvoiceCard = ({ invoice }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold">

                Invoice #{invoice.invoiceNo}

            </h2>

            <p className="mt-3">

                Client : {invoice.client}

            </p>

            <p>

                Amount : ₹ {invoice.amount}

            </p>

            <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded">

                Download Invoice

            </button>

        </div>

    );

};

export default InvoiceCard;