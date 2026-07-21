const Statistics = () => {

    const stats = [
        { label: "Projects", value: "25K+" },
        { label: "Freelancers", value: "12K+" },
        { label: "Clients", value: "8K+" },
        { label: "Payments", value: "₹10Cr+" },
    ];

    return (
        <section className="bg-blue-700 text-white py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((item) => (
                    <div key={item.label}>
                        <h3 className="text-4xl font-bold">{item.value}</h3>
                        <p className="mt-2">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;