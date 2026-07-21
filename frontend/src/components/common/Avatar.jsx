const Avatar = ({ image, size = 12 }) => {
    return (
        <img
            src={image}
            alt="avatar"
            className={`w-${size} h-${size} rounded-full object-cover`}
        />
    );
};

export default Avatar;