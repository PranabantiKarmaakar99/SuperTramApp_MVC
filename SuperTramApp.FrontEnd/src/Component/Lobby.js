import { useState } from "react";

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");

    return (
        <form
            className="flex flex-col gap-4 p-6 bg-gray-100 rounded-md shadow-md max-w-md mx-auto mt-[70px]"
            onSubmit={(e) => {
                e.preventDefault();
                joinRoom(user, room);
            }}
        >
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setUser(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Room"
                    onChange={(e) => setRoom(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={!user || !room}
                className={`px-4 py-2 rounded-md text-white ${!user || !room ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-black-800'}`}
            >
                Join
            </button>
        </form>

    );
}

export default Lobby;
