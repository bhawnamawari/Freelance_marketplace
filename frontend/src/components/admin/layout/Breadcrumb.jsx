import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
    return (
        <div className="flex items-center gap-2 text-sm mb-6">

            {items.map((item, index) => (

                <div
                    key={index}
                    className="flex items-center gap-2"
                >
                    {index > 0 && <span>/</span>}

                    {item.href ? (
                        <Link
                            to={item.href}
                            className="text-blue-600 hover:underline"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold">
                            {item.label}
                        </span>
                    )}

                </div>

            ))}

        </div>
    );
};

export default Breadcrumb;