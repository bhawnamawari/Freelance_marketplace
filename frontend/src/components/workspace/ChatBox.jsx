import MessageBubble from "./MessageBubble";

const ChatBox = ({ messages }) => {

    return (

        <div className="bg-white rounded-xl shadow p-5 h-[500px] overflow-y-auto">

            {messages.map((message) => (

                <MessageBubble
                    key={message._id}
                    message={message}
                />

            ))}

        </div>

    );

};

export default ChatBox;