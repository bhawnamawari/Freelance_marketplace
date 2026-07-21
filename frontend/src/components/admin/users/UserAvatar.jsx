import {
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

const UserAvatar = ({
  avatar,
  name,
  online = false,
  verified = false,
}) => {
  return (
    <div className="relative w-fit">

      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border"
      />

      {online && (
        <FaCircle
          className="absolute bottom-0 right-0 text-green-500 bg-white rounded-full text-xs"
        />
      )}

      {verified && (
        <FaCheckCircle
          className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full"
        />
      )}

    </div>
  );
};

export default UserAvatar;