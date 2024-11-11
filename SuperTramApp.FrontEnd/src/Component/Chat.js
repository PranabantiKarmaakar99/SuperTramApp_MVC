
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat = ({ messages, sendMessage, closeConnection }) => (
    <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4 bg-gray-100 mt-[20px]">
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />

            <div className="mt-[20px]">
                <button
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-black-400 transition-colors duration-300"
                    onClick={() => closeConnection()}
                >
                    Leave Room
                </button>

            </div>
        </div>
        <div className="flex justify-center mt-4">
        </div>
    </div>
);

export default Chat;
