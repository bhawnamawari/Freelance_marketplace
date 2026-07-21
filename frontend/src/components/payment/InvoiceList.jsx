import InvoiceCard from "./InvoiceCard";

const InvoiceList = ({ invoices }) => {

    return (

        <div className="grid md:grid-cols-2 gap-6">

            {invoices.map(invoice => (

                <InvoiceCard
                    key={invoice._id}
                    invoice={invoice}
                />

            ))}

        </div>

    );

};

export default InvoiceList;