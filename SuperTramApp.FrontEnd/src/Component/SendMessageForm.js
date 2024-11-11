import { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}
            className="flex"
        >
            <div className="flex-grow">
                <input
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="w-[99%] p-2 border rounded-l-md mr-[164px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={!message}
                className={`p-2 w-[18%] bg-black text-white rounded-lg h-[46px] mt-[6px] transition-colors duration-300 ${
                    message ? 'hover:bg-slate-600' : 'opacity-50 cursor-not-allowed'
                }`}
            >
                Send
            </button>
        </form>
    );
};

export default SendMessageForm;

