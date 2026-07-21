const MessageBubble = ({ message }) => {

    return (

        <div
            className={`mb-4 flex ${
                message.isOwn ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`px-5 py-3 rounded-xl max-w-md ${
                    message.isOwn
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                }`}
            >

                <p>{message.message}</p>

                <small className="block mt-2">

                    {message.time}

                </small>

            </div>

        </div>

    );

};

export default MessageBubble;