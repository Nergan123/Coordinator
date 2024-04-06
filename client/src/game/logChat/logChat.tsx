import './logChat.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("http://localhost:8001");

function LogChat({initialMessages}: {initialMessages: string[]}) {
    const [messages, setMessages] = useState<string[]>(initialMessages);

    useEffect(() => {
        socket.on("message", (messagesNew: string[]) => {
            setMessages(messagesNew);
        });
    }, []);

    return(
        <div className={"log-chat"}>
            {messages.map((message, index) => <p key={index}>{message}</p>)}
            <p>Logging Terminal:</p>
        </div>
    );
}

export default LogChat;