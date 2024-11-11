import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import '../App.css';
import Lobby from './Lobby';
import Chat from './Chat';

const Community = () => {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7058/chatHub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.onclose(e => {
                setConnection();
                setMessages([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });

            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    };

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="app p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800">SuperTram Community</h2>
            {(!connection)
                ? <Lobby joinRoom={joinRoom} />
                : <Chat 
                    messages={messages} 
                    sendMessage={sendMessage} 
                    closeConnection={closeConnection} 
                  />}
        </div>
    );
};

export default Community;

