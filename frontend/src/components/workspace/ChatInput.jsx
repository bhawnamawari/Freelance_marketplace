import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend }) => {

    const [message, setMessage] = useState("");

    const sendMessage = () => {

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    };

    return (

        <div className="flex gap-3 mt-4">

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-lg p-3"
                placeholder="Type message..."
            />

            <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 rounded-lg"
            >

                <FaPaperPlane/>

            </button>

        </div>

    );

};

export default ChatInput;