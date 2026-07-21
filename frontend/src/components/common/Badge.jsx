const Badge = ({ children }) => {
    return (
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {children}
        </span>
    );
};

export default Badge;