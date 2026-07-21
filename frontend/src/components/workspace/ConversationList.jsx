const ConversationList = ({ conversations, onSelect }) => {

    return (

        <div className="bg-white rounded-xl shadow">

            {conversations.map((chat) => (

                <div
                    key={chat._id}
                    onClick={() => onSelect(chat)}
                    className="p-4 border-b cursor-pointer hover:bg-gray-100"
                >

                    <h3 className="font-semibold">

                        {chat.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {chat.lastMessage}

                    </p>

                </div>

            ))}

        </div>

    );

};

export default ConversationList;